const form = document.getElementById('forms');
const names = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const birth = document.getElementById('birth');
const allergies = document.getElementById('allergies');
const medications = document.getElementById('medications');
const pregnancys = document.getElementById('pregnancy');
const noneBox = document.getElementById('nones');
const medicalservices = document.getElementById('medicalservices');
const appointmentDate = document.getElementById('appointmentdate');

form.addEventListener('submit', e => {
  if (!validateForm()) {
    e.preventDefault(); 
  } else {
    alert("Form submitted username: " + names.value);
  }
});


[names, email, phone, birth, allergies, medications, pregnancys, appointmentDate, medicalservices, noneBox].forEach(input => {
   if (input) {

    input.addEventListener('input', () => validateInputs(input));

    input.addEventListener('focus', () => {
      const inputControl = input.parentElement;
      inputControl.classList.remove('error');
      const errorDisplay = inputControl.querySelector('.error');
      if (errorDisplay) errorDisplay.innerText = '';
      input.style.borderColor = ''; 
    });

    input.addEventListener('blur', () => validateField(input));
  }
});

if (noneBox) {
  const checkboxes = noneBox.querySelectorAll("input[type='checkbox']");
  const noneCheckbox = noneBox.querySelector("#none");

  // Loop through all checkboxes
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      const inputControl = noneBox.parentElement;

      let isNoneChecked = noneCheckbox.checked;
      let otherChecked = false;

      // Check if any other box (not "none") is checked
      for (let i = 0; i < checkboxes.length; i++) {
        let box = checkboxes[i];
        if (box !== noneCheckbox && box.checked) {
          otherChecked = true;
        }
      }

      // If "None of the above" and another are both checked
      if (isNoneChecked && otherChecked) {
        inputControl.classList.add('error');
        setError(noneBox, 'You selected "None of the above". Please uncheck other your conditions.');
        noneBox.style.borderColor = 'red';
        noneCheckbox.checked = false; // uncheck "None"
        return;
      }

      // Normal validation
      if (isNoneChecked || otherChecked) {
        inputControl.classList.remove('error');
        const errorMessage = inputControl.querySelector('.error');
        if (errorMessage) {
          errorMessage.innerText = '';
        }
        noneBox.style.borderColor = '';
      } else {
        inputControl.classList.add('error');
        setError(noneBox, 'Please select at least one condition');
      }
    });
  });
}

const setError = (element, message) => {
  if (!element) return;
  const inputControl = element.parentElement;
  if (!inputControl) return;

  let errorDisplay = inputControl.querySelector('.error');
  if (!errorDisplay) {
    errorDisplay = document.createElement('div');
    errorDisplay.className = 'error';
    inputControl.appendChild(errorDisplay);
  }

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
  element.classList.add('error-border');
};

const setSuccess = element => {
  if (!element) return;
  const inputControl = element.parentElement;
  if (!inputControl) return;

  const errorDisplay = inputControl.querySelector('.error');
  if (errorDisplay) errorDisplay.innerText = '';

  inputControl.classList.add('success');
  inputControl.classList.remove('error');
  element.classList.remove('error-border');

  setTimeout(() => {
    inputControl.classList.remove('success');
  }, 3000);
};

const isValidEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateField = (field) => {
  if (field === names) {
    const value = names.value.trim();
    if (value === '') {
      setError(names, 'Name is required');
      return false;
    } else if (!/^[A-Za-z\s,]+$/.test(value)) {
      setError(names, 'must contain only name');
      return false;
    } else {
      setSuccess(names);
      return true;
    }
  }

  if (field === email) {
    const value = email.value.trim();
    if (value === '') {
      setError(email, 'Email is required');
      return false;
    } else if (!isValidEmail(value)) {
      setError(email, 'Provide a valid email address');
      return false;
    } else {
      setSuccess(email);
      return true;
    }
  }

  if (field === phone) {
    const value = phone.value.trim();
    const digits = value.replace(/\D/g, '');
    if (value === '') {
      setError(phone, 'Phone number is required');
      return false;
    } else if (!/^\d+$/.test(value)) {
      setError(phone, 'Phone number must contain only numbers');
      return false;
    } else if (digits.length < 11) {
      setError(phone, 'Phone number must be at least 11 digits');
      return false;
    } else {
      setSuccess(phone);
      return true;
    }
  }

  if (field === birth) {
    if (birth.value.trim() === '') {
      setError(birth, 'Date of Birth is required');
      return false;
    } else {
      setSuccess(birth);
      return true;
    }
  }

  if (field === allergies) {
    if (allergies.value.trim() === '') {
      setError(allergies, 'Allergies is required');
      return false;
    } else {
      setSuccess(allergies);
      return true;
    }
  }

  if (field === medications) {
    if (medications.value.trim() === '') {
      setError(medications, 'Medications is required');
      return false;
    } else {
      setSuccess(medications);
      return true;
    }
  }

  if (field === pregnancys) {
    if (pregnancys.value.trim() === '') {
      setError(pregnancys, 'Pregnancy is required');
      return false;
    } else {
      setSuccess(pregnancys);
      return true;
    }
  }

  if (field === noneBox) {
    const checkboxes = noneBox.querySelectorAll("input[type='checkbox']");
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);

    if (!isChecked) {
      setError(noneBox, 'Please select at least one condition');
      return false;
    } else {
      setSuccess(noneBox);
      return true;
    }
  }

  if (field === medicalservices) {
    if (!medicalservices.value) {
      setError(medicalservices, 'Please select a medical service');
      return false;
    } else {
      setSuccess(medicalservices);
      return true;
    }
  }

  if (medicalservices) {
    medicalservices.addEventListener('change', () => {
      if (appointmentDate.value.trim() !== '') {
        validateField(appointmentDate);
      }
    });
  }

  if (field === appointmentDate) {
    const dateValue = appointmentDate.value.trim();
    const selectedService = medicalservices.value;

    if (dateValue === '') {
      setError(appointmentDate, 'Appointment date is required');
      return false;
    }
    
    if (selectedService) {
      const roomDays = {
        '101': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        '102': ['Wednesday'],
        '103': ['Monday'],
        '104': ['Friday'],
        '105': ['Friday']
      };

      
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[new Date(dateValue).getDay()];
      const validDays = roomDays[selectedService];

      
      if (!validDays.includes(dayName)) {
        setError(appointmentDate, `Invalid date. This service is available only on ${validDays.join(', ')}.`);
        return false; 
      }
    }
    setSuccess(appointmentDate);
    return true;
  }
  return true;

};


if (form) {
  form.addEventListener('reset', e => {
    const confirmation = confirm("Changes that you made may not be saved this form?");
    // if the user click ok, reset the form
    if (confirmation) {
      form.reset();

      setTimeout(() => {
        const fields = [names, email, phone, birth, allergies, medications, pregnancys, noneBox, medicalservices, appointmentDate];

        fields.forEach(field => {
          if (!field) return;

          field.classList.remove('error-border');
          field.style.borderColor = '';
          const parent = field.parentElement;
          if (parent) {
            parent.classList.remove('error', 'success');
            const errorMsg = parent.querySelector('.error');
            if (errorMsg) errorMsg.remove();
          }

      
          if (field === noneBox) {
            noneBox.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
            noneBox.style.borderColor = '';
          }

        
          if (field.tagName.toLowerCase() === 'select') {
            field.selectedIndex = 0;
          }
        });
      }, 0);
      // if the user click cancel, prevent the default action so the action is not submitted then the fill up form is not reset
    } else {
      e.preventDefault();
    }
  });
}


const validateForm = () => {
  let valid = true;
  [names, email, phone, birth, allergies, medications, pregnancys, noneBox, medicalservices, appointmentDate, medicalservices, noneBox].forEach(f => {
    if (f && !validateField(f)) valid = false;
  });
  return valid;


};