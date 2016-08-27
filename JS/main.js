/*
* Get from codepen.io
* Modification by Setni to match with allVisio standards :
* Add MultiFile management
* Add a deleting button
*/


(function(handlebars) {
    compteur = 0;
	function parse_template(id, context) {
		 var source = $('#' + id).html();
  	     return handlebars.compile(source)(context);
    }

 	function addFileInput($fileList, allowRemove) {
        compteur++;
        var context = {
            field_name: 'fichier[]',
            field_id: 'fichierId' + compteur,
            allowRemove: allowRemove
        };
        
        var template = parse_template('file-upload-template', context);
        $fileList.append(template);

        $('.remove-link').click(function(e) {
            e.preventDefault();
            $(this).parents('li').remove();
        });
    }



    $.fn.multipleFileUploader = function (settings) {
        $(this).each(function(index, el) {
            var defaults = {
                addButtonCaption: 'Add an other file',
                initialRequired: true,
                initialFieldCount: 1,
                containerClass: 'mfu-file-list-container',
                addButtonClass: 'mfu-add-new',
                fileListClass: 'mfu-file-list',
                $uploaderControl: $(el)
            };
            var options = $.extend(defaults, settings);

            options.$uploaderControl.addClass(options.containerClass);

            createAddButton(options);
            createFileList(options);
            addInitialFields(options);
        });
    };

    function getFileList (options) {
        return options.$uploaderControl.find('.' + options.fileListClass);
    }
  
    function createFileList (options) {
		var $fileList = $('<ul />').addClass(options.fileListClass);
        return options.$uploaderControl.prepend($fileList);
    }

    function createAddButton (options) {
        var $addButton = $('<div></div><br>')
            .addClass(options.addButtonClass)
            .text(options.addButtonCaption);

        options.$uploaderControl.append($addButton);

        return $addButton.click(function() {
            addFileInput(getFileList(options), true);
        });
    }

    function addInitialFields (options) {
        for (var i = 0; i < options.initialFieldCount; i++) {
            addFileInput(getFileList(options), options.initialRequired);
        }
    }
  
    $(document).ready(function(){
        $('.file-uploader').multipleFileUploader();
    });
})(Handlebars);