document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const errorMessage = document.getElementById('errorMessage');

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const email = document.getElementById('email');
    const password = document.getElementById('clave');

    // Validación simple de los campos
    let isValid = true;

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

    if (isValid) {
      alert('Registro exitoso');
      // Puedes redirigir a otra página o hacer lo que necesites después del registro exitoso
      // window.location.href = 'welcome.html';
    } else {
      errorMessage.textContent = 'Por favor completa todos los campos correctamente.';
      errorMessage.style.display = 'block'; // Mostrar el mensaje de error general
    }
  });

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