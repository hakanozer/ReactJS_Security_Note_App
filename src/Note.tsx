import { useFormik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { INote } from './models/INote'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from './use_redux/ReductStore'
import { NoteAction } from './use_redux/reducers/NoteReducer'
import { NoteType } from './use_redux/types/NoteType'
import { firstCharUpper } from './Util'
import HeaderTitle from './components/HeaderTitle'
import Moment from 'moment';


// Context
import { ThemeContext, themes } from './ThemeContext'

// Animation lib
import  styled, { keyframes } from 'styled-components';
import { slideInDown, fadeIn } from 'react-animations'
import { useNavigate } from 'react-router-dom'

const notTitleAnim = keyframes`${slideInDown}`
const NoteTitleDiv = styled.div`animation: forwards 1.0s ${notTitleAnim};`;

const animation = keyframes`${fadeIn}`
const AnimateDiv = styled.div`animation: forwards 1.5s ${animation};`;

function Note() {

  // navigation
  const navigate =  useNavigate()

  // useRef -> componentlere uygulama düzeyinde hakim olmak için kullanılır.
  const titleRef = useRef<HTMLInputElement>(null)
  const detailRef = useRef<HTMLTextAreaElement>(null)
  const haderTitleRef = useRef<HTMLHeadingElement>(null)

  const noteReducer = useSelector(( state: StateType ) => state.NoteReducer )
  const dispatch = useDispatch()
  const [singleNote, setSingleNote] = useState<INote>({ title: '', detail : '' })

  // Validation
  const validSchema = Yup.object({
      title: Yup.string().required("Lütfen Başlık Giriniz").min(3, "Başlık en az 3 Karakter Olmalıdır"),
      detail: Yup.string().required("Lütfen Detay Giriniz").min(3, "Detay en az 3 Karakter Olmalıdır")
  })
  
  const { handleSubmit, handleChange, errors, resetForm, handleReset } = useFormik({
    initialValues: {
      title: '',
      detail: ''
    },
    validationSchema: validSchema,
    onSubmit: values => {
      const formatDate = Moment().format('DD-MM-YYYY')
      const item:INote = {
        title: firstCharUpper(values.title),
        detail: values.detail,
        date: formatDate
      }
      const saveAction:NoteAction = {
        type: NoteType.SAVE,
        payload: item
      }
      dispatch(saveAction)
      resetForm()
      titleRef.current!.value = ''
      detailRef.current!.value = ''
      titleRef.current!.focus()
      //window.location.reload()
    }
  })

  function fncDelete(item: INote): void {
    const deleteAction: NoteAction = {
      type: NoteType.DELETE,
      payload: item
    }
    dispatch(deleteAction)
    titleRef.current?.focus()
  }


  useEffect(() => {
    titleRef.current?.focus()
    haderTitleRef.current!.style.color = '#4287f5'
    const titleVal = haderTitleRef.current?.innerHTML
    //console.log( titleVal )
  }, [])
  

    const fncAnimDiv = () => {
      return <AnimateDiv>
                <HeaderTitle headerTitleRef={haderTitleRef}></HeaderTitle>
             </AnimateDiv>
    }


    const fncNoteTitleDiv = ( item : INote, index:number ) => {
      return  <NoteTitleDiv key={index}  onClick={ (evt) => setSingleNote(item) } data-bs-toggle="modal" data-bs-target="#exampleModal" role="button" className="list-group-item list-group-item-action"  >
                <div className='row'>
                  <div className='col-1'><button className='btn btn-danger btn-sm text-left'><i className="bi bi-trash"></i></button></div>
                  <div className='col-8'><span className='px-2'>{ item.title }</span></div>
                  <div className='col-3'><span className="badge text-bg-primary">{ item.date }</span></div>
                </div>
              </NoteTitleDiv>
            
    }
  const [themeState, setThemeState] = useState(themes.light)
  const context = useContext(ThemeContext)
  // https://dev.to/nas5w/toggling-light-dark-theme-in-react-with-usecontext-39hn

  // all data clear
  const allDataClear = () => {
    const answer = window.confirm("Tüm datalarınız ve şifreniz silinecek, onaylıyor musunuz?")
    if (answer) {
      localStorage.removeItem('notes')
      localStorage.removeItem('userPass')
      const note:INote = { title: '',detail: ''}
      const deleteAllAction:NoteAction = {
        type: NoteType.ALLDELETE,
        payload: note
      }
      dispatch(deleteAllAction)
      navigate('/')
    }
  }

  return (
    <>
    <ThemeContext.Provider value={themeState}>
      {/*<button onClick={(evt) => setThemeState( themes.light )} > Light </button>
      <button onClick={(evt) => setThemeState( themes.dark )} > Dark </button>
      */}
    { /*context.textColor*/ }
    { fncAnimDiv() }
    <div className='row'>
      <div className='col-10'>
        <p className="lead" style={{ color: context.textColor }}  >
          Notlarınızı sadece sizin görebileceğiniz tam güvenli not uygulaması.
        </p>
      </div>
      <div className='col-2'>
        <div className="text-end">
          <button onClick={()=> allDataClear()} className='btn btn-danger pull-right'>Tüm Bilgileri Sil</button>
        </div>
      </div>
    </div>
    
    <hr></hr>
    <div className='row'>
      <div className='col-sm-5'>
        <h2 className='display-6'>Not Listesi</h2>
        <div className="list-group ">
        <a className="list-group-item list-group-item-action active">Notlar</a>
        {  noteReducer.map(( item, index ) => 
         fncNoteTitleDiv(item, index) 
        )}
        </div>
      </div>
      <div className='col-sm-7'>
      <h2 className='display-6'>Not Kayıt</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Başlık</label>
            <input ref={titleRef} onChange={handleChange} type="text" className="form-control" id="title" placeholder="Başlık" />
            <span className='text-danger'>{ errors.title ? errors.title : '' }</span>
          </div>
          <div className="mb-3">
            <label htmlFor="detail" className="form-label">Detay</label>
            <textarea ref={detailRef} onChange={handleChange} className="form-control" id="detail" rows={3} placeholder="Detay"></textarea>
            <span className='text-danger'>{ errors.detail ? errors.detail : '' }</span>
          </div>
          <button type='submit' className='btn btn-success'><i className="bi bi-send"></i> Kaydet</button>&nbsp;&nbsp;
          <button type='reset' onClick={(evt) => handleReset  } className='btn btn-secondary'><i className="bi bi-x-lg"></i> Temizle</button>
        </form>
      </div>
    </div>

    { singleNote &&  
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel"> { singleNote.title } </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className='text-end'>
            <span className="badge text-bg-primary mt-2 me-3">{ singleNote.date }</span>
          </div>
          <div className="modal-body pt-2">
            <span className='font-weight-ligh'>{ singleNote.detail }</span>
          </div>
          <div className="modal-footer">
            <button onClick={(evt) => fncDelete( singleNote )} data-bs-dismiss="modal" type="button" className="btn btn-danger">Sil</button>
          </div>
        </div>
      </div>
    </div>
    }
    </ThemeContext.Provider>
    </>
  )
}

export default Note


