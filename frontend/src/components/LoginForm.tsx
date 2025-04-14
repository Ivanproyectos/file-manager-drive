import { loginAsync } from "@/api/login";
import { getUserById } from "@/api/users";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/schemas";
import { ILogin, IUserSession } from "@/types";
import { formatPersonName } from "@/utils/formatPeople";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ILogin>({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILogin)  => {
    try {
        setMessage("");
        const response = await loginAsync(data)
        const user = await getUserById(response.userId);
  
        const userSession: IUserSession = {
            id: user.id,
            name: formatPersonName(user.people),
            email: user.people.email,
            personType : user.people.personType, 
            roles: user.roles?.map(role => role.roleName) || []
        }
        login(response.token,response.expiresIn, userSession);
        navigate("/dashboard");
    } catch (error: any) {
        if(error.response?.status === 401){
            setMessage(error.response.data.message);
            return
        }
        setMessage("Ocurrio un error inesperado al iniciar sesión");
        console.error(error);
    }

  }

  return (
    <form
      className="js-validate needs-validation"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="text-center">
        <div className="mb-5">
          <h1 className="display-5">Iniciar sesión </h1>
        {/*   <p>
            ¿ Aun no tienes una cuenta ?{" "}
            <a className="link" href="./authentication-signup-basic.html">
              Registrate aqui
            </a>
          </p> */}
        </div>

        <div className="d-grid mb-4" style ={{placeContent: "center"}}>
          <img
            className="img-fluid me-2"
            src="./assets/img/others/file-manager.png"
            alt="file manageer"
            width="300"

          />
        </div>
        {/* 
        <span className="divider-center text-muted mb-4">OR</span>  */}
      </div>

      {/* htmlForm */}
      <div className="mb-4">
        <label className="form-label" htmlFor="email">
          Indetificación (DNI o RUC)
        </label>
        <input
          {...register("email")}
          type="email"
          className = {`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`} 
          name="email"
          id="email"
          tabIndex={1}
          placeholder="12345678"
          aria-label="12345678"
          required
        />

        {errors.email && <span className="invalid-feedback">{errors?.email?.message}</span>}
      </div>

      <div className="mb-4">
        <label
          className="form-label w-100"
          htmlFor="password"
          tabIndex={0}
        >
          <span className="d-flex justify-content-between align-items-center">
            <span>Contraseña</span>
        {/*     <a
              className="form-label-link mb-0"
              href="./authentication-reset-password-basic.html"
            >
              Olvidaste tu contraseña?
            </a> */}
          </span>
        </label>

        <div
          className= {`input-group input-group-merge ${errors.password ? "is-invalid" : ""}`} >
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className = "js-toggle-password form-control form-control-lg"
            name="password"
            id="password"
            placeholder="Se requieren más de 6 caracteres"
            aria-label="Se requieren más de 6 caracteres"
            required
            minLength={6} />
          <a
          onClick={() => setShowPassword(!showPassword)}
            className="input-group-append input-group-text"
            href="javascript:;"
          >
            {showPassword && (
                <i id="changePassIcon" className="bi-eye"></i>
            )}
            {!showPassword && (
                <i id="changePassIcon" className="bi-eye-slash"></i>
            )}
          
          </a>
        </div>

        {errors.password && <span className="invalid-feedback">{errors?.password?.message}</span>}
      </div>

      {/* <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="termsCheckbox"
        />
        <label className="form-check-label" htmlFor="termsCheckbox">
          Recuerdame
        </label>
      </div> */}

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={!isValid}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Validando...
            </>
          ) : (
            "Ingresar"
          )}
        </button>
      </div>
      {message && <div className="text-danger text-center mt-3" role="alert">{message}</div>}
    </form>
  );
};
