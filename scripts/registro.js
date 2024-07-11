document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const errorMessage = document.getElementById('errorMessage');

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const firstName = document.getElementById('nombre');
    const lastName = document.getElementById('apellido');
    const birth = document.getElementById('nacimiento');
    const email = document.getElementById('email');
    const password = document.getElementById('clave');
    const confirmPassword = document.getElementById('confirmClave');
    const pais = document.getElementById('pais');

    // Validación simple de los campos
    let isValid = true;

    if (!checkInput(firstName.value)) {
      showError(firstName, 'Por favor ingresa tu nombre.');
      isValid = false;
    } else {
      hideError(firstName);
    }

    if (!checkInput(lastName.value)) {
      showError(lastName, 'Por favor ingresa tu apellido.');
      isValid = false;
    } else {
      hideError(lastName);
    }

    if (!checkInput(birth.value)) {
      showError(birth, 'Por favor ingresa tu fecha de nacimiento.');
      isValid = false;
    } else {
      hideError(birth);
    }

    if (!validateEmail(email.value)) {
      showError(email, 'Por favor ingresa un correo electrónico válido.');
      isValid = false;
    } else {
      hideError(email);
    }

    if (!checkInput(password.value)) {
      showError(password, 'Por favor ingresa una contraseña.');
      isValid = false;
    } else {
      hideError(password);
    }

    if (!checkInput(confirmPassword.value)) {
      showError(confirmPassword, 'Por favor confirma tu contraseña.');
      isValid = false;
    } else {
      hideError(confirmPassword);
    }

    if (!checkInput(pais.value)) {
      showError(pais, 'Por favor selecciona un país.');
      isValid = false;
    } else {
      hideError(pais);
    }

    // Validar que las contraseñas coincidan
    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Las contraseñas no coinciden.');
      isValid = false;
    } else {
      hideError(confirmPassword);
    }

    if (isValid) {
      // Aquí puedes llamar a la función de registro asíncrona
      registarUsuario().catch(error => {
        console.error('Error al registrar usuario:', error);
        errorMessage.textContent = 'Ocurrió un error al registrar. Por favor, inténtalo de nuevo.';
        errorMessage.style.display = 'block';
      });
    } else {
      errorMessage.textContent = 'Por favor completa todos los campos correctamente.';
      errorMessage.style.display = 'block'; // Mostrar el mensaje de error general
    }
  });

  async function registarUsuario() {
    const firstName = document.getElementById('nombre').value;
    const lastName = document.getElementById('apellido').value;
    const birth = document.getElementById('nacimiento').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('clave').value;
    const confirmPassword = document.getElementById('confirmClave').value;
    const pais = document.getElementById('pais').value;
    const response = await fetch("http://localhost:4000/guardarUsuario", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: firstName,
        apellido: lastName,
        nacimiento: birth,
        email: email,
        clave: password,
        confirmClave: confirmPassword,
        pais: pais
      })
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    alert('Registro exitoso');
    // Puedes redirigir a otra página o hacer lo que necesites después del registro exitoso
    // window.location.href = 'welcome.html';
  }

  function showError(input, message) {
    const formControl = input.parentElement;
    const feedback = formControl.querySelector('.invalid-feedback');
    formControl.classList.add('error');
    feedback.textContent = message;
    feedback.style.display = 'block'; // Mostrar el mensaje de error específico
  }

  function hideError(input) {
    const formControl = input.parentElement;
    const feedback = formControl.querySelector('.invalid-feedback');
    formControl.classList.remove('error');
    feedback.textContent = ''; // Limpiar el mensaje de error
    feedback.style.display = 'none'; // Ocultar el mensaje de error específico
  }

  function checkInput(value) {
    return value.trim() !== '';
  }

  function validateEmail(email) {
    // Expresión regular simple para validar correos electrónicos
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
