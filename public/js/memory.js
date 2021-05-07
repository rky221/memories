$(document).ready( function () { 

    $("#memoriesTitle").on('click', function () {
        $('html, body').animate({
            scrollTop: $("#cardDeck").offset().top+10
        }, 500);
    });

    $("#addMemoryBtn, .edit").on('click', function () {
        $('html, body').animate({
            scrollTop: $("#memoryForm").offset().top-60
        }, 500);
    });

    function clearForm() {
        $('#title').val('');
        $('#creator').val('');
        $('#tags').val('');
        $('#imgPreview').attr('src', '');
        $('#chooseImg').val('');
        $('#message').val('');
    }

    function showAddForm() {
        clearForm();
        $('#formName').html('Add A New Memory');
        $('#memoryForm').attr('action', '/');
        $('#imgInputLabel').html('Choose Image');
        $('#addEditMemory').html('Save');
        $('#changeToAddForm').hide();
    }

    $('#clear, #addMemoryBtn, #changeToAddForm').on('click', function () {
        showAddForm()
    });

    $(".edit").on('click', function () {
        const thisCard = $(this).parents('.card'); 
        const selectedCardId = thisCard.find(".editCardIds").attr('value');
        const selectedCardTitle = thisCard.find('.card-title').html();
        const selectedCardCreator = thisCard.find('.card-creator').html();
        const selectedCardTags = thisCard.find('.card-tags').html().substring(1).split('#').join(', ').split(' ,').join(',');
        const selectedCardImgSrc = thisCard.find('.card-img-top').attr('src');
        const selectedCardMessage = thisCard.find('.card-msg-full').html();
        $('#editId').val(selectedCardId);
        $('#title').val(selectedCardTitle);
        $('#creator').val(selectedCardCreator);
        $('#tags').val(selectedCardTags);
        $('#imgPreview').attr('src', selectedCardImgSrc);
        $('#message').val(selectedCardMessage);
        $('#formName').html('Update A Memory');
        $('#memoryForm').attr('action', '/update');
        $('#imgInputLabel').html('Change Current Image');
        $('#addEditMemory').html('Update');
        $('#changeToAddForm').show();
    });

    $('#chooseImg').on('change', function (event) {
        const selectedImg = $('#imgPreview');
        selectedImg.attr('src', URL.createObjectURL(event.target.files[0]));
        selectedImg.on('load', function() {
            URL.revokeObjectURL(selectedImg.attr('src'));
        });
    });

    $('.read-more').on('click', function () {
        const thisMessage = $(this).parents('.card-body');
        thisMessage.find('.card-msg-short').hide();
        thisMessage.find('.read-more').hide();
        thisMessage.find('.card-msg-full').show();
        thisMessage.find('.read-less').show();
    });

    $('.read-less').on('click', function () {
        const thisMessage = $(this).parents('.card-body');
        thisMessage.find('.card-msg-full').hide();
        thisMessage.find('.read-less').hide();
        thisMessage.find('.card-msg-short').show();
        thisMessage.find('.read-more').show();
    });

});