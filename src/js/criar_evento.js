// Adicionar suporte ao Bootstrap para o dropdown
document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos
    const eventForm = document.getElementById('event-form');
    const imageUploadPlaceholder = document.querySelector('.image-upload-placeholder');
    const imageInput = document.getElementById('event-image');
    const dateInput = document.getElementById('event-date');
    const timeInput = document.getElementById('event-time');
    const cancelButton = document.querySelector('.btn-cancel');
    const createButton = document.querySelector('.btn-create');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Implementar funcionalidade de dropdown para o perfil
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownMenu.style.display = 'none';
            } else {
                dropdownToggle.setAttribute('aria-expanded', 'true');
                dropdownMenu.style.display = 'block';
            }
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Função para visualização da imagem
    if (imageUploadPlaceholder && imageInput) {
        imageUploadPlaceholder.addEventListener('click', function() {
            imageInput.click();
        });

        imageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file && file.type.match('image.*')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Criar elemento de imagem e aplicar estilos
                    imageUploadPlaceholder.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = 'var(--border-radius-md)';
                    
                    // Adicionar botão de remoção
                    const removeBtn = document.createElement('div');
                    removeBtn.className = 'remove-image';
                    removeBtn.innerHTML = '×';
                    removeBtn.style.position = 'absolute';
                    removeBtn.style.top = '8px';
                    removeBtn.style.right = '8px';
                    removeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    removeBtn.style.color = 'white';
                    removeBtn.style.width = '24px';
                    removeBtn.style.height = '24px';
                    removeBtn.style.borderRadius = '50%';
                    removeBtn.style.display = 'flex';
                    removeBtn.style.justifyContent = 'center';
                    removeBtn.style.alignItems = 'center';
                    removeBtn.style.cursor = 'pointer';
                    removeBtn.style.fontSize = '18px';
                    
                    // Adicionar elementos ao DOM
                    imageUploadPlaceholder.appendChild(img);
                    imageUploadPlaceholder.appendChild(removeBtn);
                    
                    // Evento para remover a imagem
                    removeBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        resetImageUpload();
                        imageInput.value = '';
                    });
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Função para resetar o upload de imagem
    function resetImageUpload() {
        imageUploadPlaceholder.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
                <path d="M21 15L16 10L5 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="plus-icon">+</span>
        `;
    }

    // Máscara para o campo de data
    if (dateInput) {
        dateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 8) {
                value = value.substring(0, 8);
            }
            
            if (value.length > 4) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4);
            } else if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            e.target.value = value;
        });
    }

    // Máscara para o campo de hora
    if (timeInput) {
        timeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            
            if (value.length > 2) {
                value = value.substring(0, 2) + ':' + value.substring(2);
            }
            
            e.target.value = value;
        });
    }

    // Validação básica do formulário
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores dos campos
            const eventName = document.getElementById('event-name').value.trim();
            const eventType = document.getElementById('event-type').value;
            const eventDescription = document.getElementById('event-description').value.trim();
            const eventDate = document.getElementById('event-date').value.trim();
            const eventTime = document.getElementById('event-time').value.trim();
            const eventAddress = document.getElementById('event-address').value.trim();
            
            // Validação simples
            let isValid = true;
            let errorMessage = '';
            
            if (!eventName) {
                isValid = false;
                errorMessage = 'Por favor, informe o nome do evento.';
                document.getElementById('event-name').focus();
            } else if (!eventType) {
                isValid = false;
                errorMessage = 'Por favor, selecione o tipo de evento.';
                document.getElementById('event-type').focus();
            } else if (!eventDescription) {
                isValid = false;
                errorMessage = 'Por favor, adicione uma descrição para o evento.';
                document.getElementById('event-description').focus();
            } else if (!eventDate) {
                isValid = false;
                errorMessage = 'Por favor, informe a data do evento.';
                document.getElementById('event-date').focus();
            } else if (!eventTime) {
                isValid = false;
                errorMessage = 'Por favor, informe o horário do evento.';
                document.getElementById('event-time').focus();
            } else if (!eventAddress) {
                isValid = false;
                errorMessage = 'Por favor, informe o endereço do evento.';
                document.getElementById('event-address').focus();
            }
            
            if (!isValid) {
                showNotification(errorMessage, 'error');
            } else {
                showNotification('Evento criado com sucesso!', 'success');
                // Aqui seria o envio do formulário para o backend
                console.log('Formulário enviado com sucesso!');
                
                // Simular redirecionamento após envio
                setTimeout(() => {
                    showNotification('Redirecionando para a lista de eventos...', 'info');
                }, 2000);
            }
        });
    }

    // Botão de cancelar
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja cancelar? Todas as informações serão perdidas.')) {
                showNotification('Operação cancelada!', 'info');
                // Simular redirecionamento após cancelamento
                setTimeout(() => {
                    showNotification('Redirecionando para a página anterior...', 'info');
                }, 1500);
            }
        });
    }

    // Sistema de notificação
    function showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos para a notificação
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '1000';
        notification.style.minWidth = '200px';
        notification.style.textAlign = 'center';
        notification.style.transition = 'all 0.3s ease';
        
        // Definir cores com base no tipo
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#F44336';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#2196F3';
            notification.style.color = 'white';
        }
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após alguns segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Adicionar efeitos de hover nos campos
    const inputElements = document.querySelectorAll('input, textarea, select');
    inputElements.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    });
});
