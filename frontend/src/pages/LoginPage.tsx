import { LoginForm } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useAuth();
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading]);

  return (
    <main id="content" role="main" className="main">

      <div className="position-fixed top-0 end-0 start-0 bg-img-start" style={{ height: '32rem', backgroundImage: 'url(./assets/svg/components/card-6.svg)' }}>

        <div className="shape shape-bottom zi-1">
          <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
            <polygon fill="#fff" points="0,273 1921,273 1921,0 " />
          </svg>
        </div>

      </div>

      {/* Content */}
      <div className="container py-5 py-sm-7">
        {/*       <a className="d-flex justify-content-center mb-5" href="./index.html">
        <img className="zi-2" src="./assets/svg/logos/logo.svg" alt="Image Description" style={{width: '8rem'}} />
      </a>
 */}
        <div className="mx-auto" style={{ maxWidth: '30rem' }}>
          {/* Card */}
          <div className="card card-lg mb-5">
            <div className="card-body">
              {/* htmlForm */}
              <LoginForm />
              {/* End htmlForm */}
            </div>
          </div>
          {/* End Card */}

          {/* Footer */}

          {/*       <div className="position-relative text-center zi-1">
          <small className="text-cap text-body mb-4">Trusted by the world's best teams</small>

          <div className="w-85 mx-auto">
            <div className="row justify-content-between">
              <div className="col">
                <img className="img-fluid" src="./assets/svg/brands/gitlab-gray.svg" alt="Logo"/>
              </div>
  

              <div className="col">
                <img className="img-fluid" src="./assets/svg/brands/fitbit-gray.svg" alt="Logo"/>
              </div>
      

              <div className="col">
                <img className="img-fluid" src="./assets/svg/brands/flow-xo-gray.svg" alt="Logo"/>
              </div>
       

              <div className="col">
                <img className="img-fluid" src="./assets/svg/brands/layar-gray.svg" alt="Logo"/>
              </div>
       
            </div>
      
          </div>
        </div> */}

          {/* End Footer */}
        </div>
      </div>
      {/* End Content */}
    </main>
  )
}
