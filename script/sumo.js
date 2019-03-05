function attachSumoSelect()
{
 // alert('hi')
  $('.testselect7').SumoSelect({ okCancelInMulti: true ,selectAll:true,locale: ['Update', 'Cancel', 'Select All']});
 

}
function aggridcss()
{
  $('.ag-pivot-mode-panel').each(function() {
   // alert('hi')
    $(this).insertAfter($(this).parent().find('.ag-column-select-panel'));
})
}