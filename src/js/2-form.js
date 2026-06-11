let formData = {
  email: "",
  message: ""
};

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');

if (!form) {
  console.error("Form '.feedback-form' not found!");
} else {

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      formData.email = parsed.email || "";
      formData.message = parsed.message || "";

      if (form.elements.email) form.elements.email.value = formData.email;
      if (form.elements.message) form.elements.message.value = formData.message;
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };

  form.addEventListener('input', (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'message') {
      formData[name] = value.trim();
      saveToLocalStorage();
    }
  });


  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
      return;
    }

    console.log(formData);

    localStorage.removeItem(STORAGE_KEY);
    formData = { email: "", message: "" };
    form.reset();
  });

  loadFromLocalStorage();
}