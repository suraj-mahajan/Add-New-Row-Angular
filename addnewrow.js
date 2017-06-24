//
//
// Plugin Name : Add New Row
// Author : suraj mahajan
//
//

; (function ($) {
    var defaults =
	 {
	     Focus: true,
	     copyEvents: false,
	 };

    $.fn.AddNew = function (options) {
        var config = $.extend({
            callback: function (a) { }
        }, defaults, options);
        var i = 1;
        var ThisID = $(this).attr('id');
        var ID = $("#" + ThisID + ">tr:last").attr('data-i');
        if (ID == undefined) {
            console.error("'data-i' attribure not provided to TR.");
        }
        if ($("#" + ThisID + ">tr:last").css('display') == 'none') {
            $("#" + ThisID + ">tr:last").css('display', 'table-row');

            config.callback.call(this, $("#" + ThisID + ">tr:last"));
        
            $("#" + ThisID + ">tr:last").find("input").each(function () {
                     if ($(this).attr('type') == 'hidden') {
            }
            else {
                $(this).val('');
            }
        });

        
            return;
        }

        var NewR = $("#" + ThisID + ">tr:last").clone(config.copyEvents).attr('data-i', parseInt(ID) + 1).css('display', 'table-row');
        NewR.find("input").each(function () {
            $(this).attr({
                'id': function (_, id) {
                    try {
                        return id.replace(ID, parseInt(ID) + 1);
                    }
                    catch (err) {
                        console.info("ID not provoded for input element");
                    }
                },
                'name': function (_, name) {
                    try {
                        return name.replace(ID, parseInt(ID) + 1);
                    }
                    catch (err) {
                        console.info("Name not provoded for input element");
                    }
                }
            });


            if (config.copyEvents == true) {
                try {
                    if ($(this).attr('type') == 'text') {
                        if ($(this).hasClass('hasDatepicker'))
                        {
                            $(this).datepicker("destroy");
                            $(this).datepicker();
                        }

                        if ($(this).hasClass('ui-autocomplete-input'))
                        {
                            $(this).autocomplete("destroy");
                            $(this).removeData("autocomplete");
                            $(this).removeClass("ui-autocomplete-input");
                            console.log('AutoComplite Destroyed');

                            debugger;
                        }
                        if ($(this).attr('data-toggle') == 'tooltip')
                        {
                            $(this).tooltip('disable');
                            $(this).attr('title', '');
                            $(this).attr('data-original-title', '');
                            $(this).tooltip('enable');
                        }
                    }
                }
                catch (err)
                { }
            }

            if ($(this).attr('type') == 'hidden') {
            }
            else {
                $(this).val('');
            }
        });

        NewR.find("div").each(function () {
            console.log(this);
            $(this).attr({
                'id': function (_, id) {
                    try {
                        return id.replace(ID, parseInt(ID) + 1);
                    }
                    catch (err) {

                    }
                }
            });
        });
        NewR.find("tbody").each(function () {
            $(this).attr({
                'id': function (_, id) {
                    try {
                        return id.replace(ID, parseInt(ID) + 1);
                    }
                    catch (err) {

                    }
                }
            });
        });

        NewR.find("a").each(function () {
            $(this).attr({
                'data-target': function (_, id) {
                    try {
                        return id.replace(ID, parseInt(ID) + 1);
                    }
                    catch (err) {
                    }
                }
            });
        });


        NewR.find("select").each(function () {
            $(this).attr({
                'id': function (_, id) {
                    try {
                        return id.replace(ID, parseInt(ID) + 1);
                    }
                    catch (err) {
                        console.info("ID not provoded for DropDown List");
                    }
                },
                'name': function (_, name) {
                    try {
                        return name.replace(ID, parseInt(ID) + 1);
                    }
                    catch (err) {
                        console.info("Name not provoded for DropDown List");
                    }
                }
            });
            if ($(this).attr('type') == 'hidden') {
            }
            else {
                $(this).val('');
            }
        });
        NewR.find("span").each(function () {
            $(this).attr({
                'data-valmsg-for': function (_, name) {
                    try { return name.replace(ID, parseInt(ID) + 1); }
                    catch (err) { }
                }
            });
        }).end();
        NewR.appendTo(this);
        config.callback.call(this, NewR);
        i++;
        $("#" + ThisID + ">tr:last").find('[id$=_Id]').each(function () {
            $(this).val('0');
        });

        if (config.Focus == true) {
            $('#' + ThisID + '>tr:last ').each(function () {
                $($(this)).find('td:first').each(function () {
                    $(this).find('input').each(function () {
                        $(this).focus();
                    });
                });
            });
        }
    }
}(jQuery));