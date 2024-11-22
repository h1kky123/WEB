document.addEventListener('DOMContentLoaded', function () {
    const formModal = new bootstrap.Modal(document.getElementById('formModal'));

    // Восстановление данных из LocalStorage
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('name').value = formData.name || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('phone').value = formData.phone || '';
        document.getElementById('organisation').value = formData.organisation || '';
        document.getElementById('message').value = formData.message || '';
        document.getElementById('checkbox').checked = formData.checkbox || false;
    }

    // Открытие формы и изменение URL
    document.querySelector('[data-bs-toggle="modal"]').addEventListener('click', function () {
        formModal.show();
        history.pushState({ isFormOpen: true }, '', '#form');
    });

    // Закрытие модального окна при нажатии на "Назад"
    window.addEventListener('popstate', function (event) {
        if (!event.state?.isFormOpen) {
            formModal.hide();
        }
    });

    // Обработка отправки формы
    document.getElementById('contactForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organisation: document.getElementById('organisation').value,
            message: document.getElementById('message').value,
            checkbox: document.getElementById('checkbox').checked
        };

        localStorage.setItem('contactFormData', JSON.stringify(formData));

        try {
            const response = await fetch('https://formcarry.com/s/bOowjskhEsi', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 7w3NdXzbCwJnHBM4mN9cughh5NdGDV1RmSvM9CPdzYGL'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Форма успешно отправлена!');
                formModal.hide();
                localStorage.removeItem('contactFormData');
            } else {
                alert('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            }
        } catch (error) {
            alert('Ошибка сети. Проверьте ваше подключение и попробуйте снова.');
        }
    });
});
