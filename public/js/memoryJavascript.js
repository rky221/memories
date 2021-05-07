function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('creator').value = '';
    document.getElementById('tags').value = '';
    document.getElementById('imgPreview').src='';
    document.getElementById('chooseImg').value = '';
    document.getElementById('message').value = '';
}

function showAddForm() {
    clearForm();
    document.getElementById('formName').innerText = 'Add A New Memory';
    document.getElementById('memoryForm').action = '/';
    document.getElementById('imgInputLabel').innerText = 'Choose Image';
    document.getElementById('addEditMemory').innerText = 'Save';
    document.getElementById('changeToAddForm').style.display = 'none';
}

function scrollToForm() {
    $('html, body').animate({
        scrollTop: $("#memoryForm").offset().top-60
    }, 500);
}

function scrollToCardStart() {
    $('html, body').animate({
        scrollTop: $("#cardDeck").offset().top+10
    }, 500);
}

document.getElementById('clear').addEventListener('click', () => showAddForm());
document.getElementById('addMemoryBtn').addEventListener('click', () => showAddForm());
document.getElementById('changeToAddForm').addEventListener('click', () => showAddForm());
document.getElementById('addMemoryBtn').addEventListener('click', () => scrollToForm());
document.getElementById("memoriesTitle").addEventListener('click', () => scrollToCardStart());


document.getElementById('chooseImg').addEventListener('change', (event) => {
    const selectedImg = document.getElementById('imgPreview');
    selectedImg.src = URL.createObjectURL(event.target.files[0]);
    selectedImg.addEventListener('load', () => URL.revokeObjectURL(selectedImg.src));
});


const editBtns = document.getElementsByClassName('edit');

for (const thisEdit of editBtns) {
    thisEdit.addEventListener('click', () => {
        const thisCard = thisEdit.closest('.card'); 
        const selectedCardId = thisCard.getElementsByClassName('editCardIds')[0].value;
        const selectedCardTitle = thisCard.getElementsByClassName('card-title')[0].innerText;
        const selectedCardCreator = thisCard.getElementsByClassName('card-creator')[0].innerText;
        const selectedCardTags = thisCard.getElementsByClassName('card-tags')[0].innerText.substring(1).split('#').join(', ').split(' ,').join(',');
        const selectedCardImgSrc = thisCard.getElementsByClassName('card-img-top')[0].src; 
        const selectedCardMessage = thisCard.getElementsByClassName('card-msg-full')[0].innerText;

        document.getElementById('editId').value = selectedCardId;
        document.getElementById('title').value = selectedCardTitle;
        document.getElementById('creator').value = selectedCardCreator;
        document.getElementById('tags').value = selectedCardTags;
        document.getElementById('imgPreview').src = selectedCardImgSrc;
        document.getElementById('message').value = selectedCardMessage;
        document.getElementById('formName').innerText = 'Update A Memory';
        document.getElementById('memoryForm').action = '/update';
        document.getElementById('imgInputLabel').innerText = 'Change Current Image';
        document.getElementById('addEditMemory').innerText = 'Update';
        document.getElementById('changeToAddForm').style.display = 'none';
    });
}


const readMores = document.getElementsByClassName('read-more');

for (const thisReadMore of readMores) {
    thisReadMore.addEventListener('click', () => {
        const thisMessage = thisReadMore.closest('.card-body');
        thisMessage.getElementsByClassName('card-msg-short')[0].style.display = 'none';
        thisMessage.getElementsByClassName('read-more')[0].style.display = 'none';
        thisMessage.getElementsByClassName('card-msg-full')[0].style.display = 'block';
        thisMessage.getElementsByClassName('read-less')[0].style.display = 'block';
    });
}


const readLessElements = document.getElementsByClassName('read-less');

for (const thisReadLess of readLessElements) {
    thisReadLess.addEventListener('click', () => {
        const thisMessage = thisReadLess.closest('.card-body');
        thisMessage.getElementsByClassName('card-msg-short')[0].style.display = 'block';
        thisMessage.getElementsByClassName('read-more')[0].style.display = 'block';
        thisMessage.getElementsByClassName('card-msg-full')[0].style.display = 'none';
        thisMessage.getElementsByClassName('read-less')[0].style.display = 'none';
    });
}
