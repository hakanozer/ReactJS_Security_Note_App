import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { decrypt, encrypt } from './Util';

function Login() {

  // Redirect
  const navigate = useNavigate()

  const [pass1, setPass1] = useState("")
  const [pass2, setPass2] = useState("")
  useEffect(() => {
    if ( pass1 !== '' && pass1 === pass2 ) {
      localStorage.setItem('userPass', encrypt(pass1))
      passwordControl()
    }
  }, [pass1, pass2])
  

  const [passForm, setPassForm] = useState(false)
  const [nowPass, setNowPass] = useState("")
  const [plainText, setPlainText] = useState("")
  const passwordControl = () => {
    const stPass = localStorage.getItem('userPass')
    if ( stPass ) {
      const plainText = decrypt(stPass)
      setPlainText(plainText)
      setPassForm(true)
    }
  }
  useEffect(() => {
    passwordControl()
  }, [])

  useEffect(() => {
    if ( nowPass !== '' && nowPass === plainText ) {
      const stPass = localStorage.getItem('userPass')
      navigate('/notes', { replace: true, state: stPass })
    }
  }, [nowPass])
  
  

  return (
    <>
      <ToastContainer />
      <div className='d-flex align-items-center justify-content-center' style={{height: '100vh'}}>
        <div className="card p-5">
            <div className="card-body">
              { !passForm &&
                <>
                  <h2 className='text-center'>Şifre Belirle</h2>
                  <div className='mt-3'>
                    <label className="form-label" htmlFor='pass1'>Şifre</label>
                    <input id='pass1' onChange={ (evt) => setPass1( evt.target.value ) } className="form-control form-control-lg" type="password" placeholder="Şifre" aria-label="Şifre" />
                  </div>
                  {
                    pass1.length > 4 &&
                    <div className='mt-3'>
                      <label className="form-label" htmlFor='pass2'>Şifre Tekrar</label>
                      <input id='pass2' onChange={ (evt) => setPass2( evt.target.value ) } className="form-control form-control-lg" type="password" placeholder="Şifre Tekrar" aria-label="Şifre Tekrar" />
                    </div>
                  }
                </>
              }
              {
                passForm && 
                <>
                  <h2 className='text-center'>Şifre Giriniz</h2>
                  <div className='mt-3'>
                    <label className="form-label" htmlFor='pass3'>Şifre</label>
                    <input id='pass3' onChange={ (evt) => setNowPass( evt.target.value ) } className="form-control form-control-lg" type="password" placeholder="Şifre" aria-label="Şifre" />
                  </div>
                </>
              }
            </div>
        </div>
      </div>
    </>
  );
}

export default Login;
