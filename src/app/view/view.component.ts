import { Component, OnInit, ViewChild } from '@angular/core';
import { Grid, GridOptions } from "ag-grid-community";
//import {Grid} from "ag-grid-enterprise/src/main";
// import "ag-grid/dist/styles/ag-grid.css";
// import "ag-grid/dist/styles/ag-theme-balham.css";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterService } from '../../app/_services/masterdata.service'
import { InputGridViewstate } from '../../app/_models/masterdata.model'
import { GetgridViewStateParam } from '../../app/_models/masterdata.model'
import "ag-grid-enterprise";
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material';
import { environment } from '../../environments/environment';
import { Message } from 'primeng/components/common/api';
declare function attachSumoSelect(): any;
declare function aggridcss(): any; 
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [MasterService]
})
export class ViewComponent implements OnInit {
  @ViewChild('allViewSelected') private allViewSelected: MatOption;
  siteurl: string = environment.siteurl;
  searchView: FormGroup;
  private gridApi;
  private gridColumnApi;
  response: string;
  foundationname: string = "foundation name"
  inputGridViewstate: InputGridViewstate[] = [];
  private gridOptions: GridOptions = <GridOptions>{};
  foundationId: string;
  selectedDropdownView: string[];
  listView: SelectItem[];
  title = 'my-app';
  count = 0;
  rowDatavalues: [];
  colDatavalues: [];
  isdivviewnameVisible: boolean = false;
  viewname: string;
  viewlist: [];
  choosedView: string = "Default view";
  display: boolean = false;
  getgridViewStateParam: GetgridViewStateParam[] = []
  gridStateMsg: Message[] = [];
  confirmMsg: "";
  selectedViewId: 0;
  selectedViewName: "";
  IsUpdated: boolean = true;
  IsDeleted: boolean = false;
   IsUpdateview:number=0;;
  constructor(private fb: FormBuilder, private router: Router, private masterService: MasterService) {
    this.createCoulmnData()
  }
  showDialog() {
    this.isdivviewnameVisible = true;
  }

  createGridOption() {

    var groupColumn = {
      //headerName: "Group",
      width: 200,
      field: 'name',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      cellRenderer: 'agGroupCellRenderer',

      cellRendererParams: {
        suppressCount: true,
        checkbox: false
      }
    };

    this.gridOptions = {
      // suppressSetColumnStateEvents : true,
      columnDefs: this.createColumnDefs(),
      rowData: this.createRowDefs()
      , statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalAndFilteredRowCountComponent', key: 'totalAndFilter', align: 'left' },
          { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
          { statusPanel: 'agAggregationComponent', align: 'right' }
        ]
      },


      defaultExportParams: {
        columnGroups: true
      },

      enableCellChangeFlash: true,
      rowDragManaged: true,
      pivotMode: false,

      // popupParent: document.body,
      // ensureDomOrder: true,
      // postProcessPopup: function(params) {
      //     console.log(params);
      // },
      // need to be careful here inside the normal demo, as names are not unique if big data sets
      // getRowNodeId: function(data) {
      //     return data.name;
      // },
      // suppressAsyncEvents: true,
      // suppressAggAtRootLevel: true,
      floatingFilter: true,
      // debug: true,
      // editType: 'fullRow',
      // debug: true,
      // suppressMultiRangeSelection: true,
      rowGroupPanelShow: 'always', // on of ['always','onlyWhenGrouping']
      pivotPanelShow: 'always', // on of ['always','onlyWhenPivoting']
      pivotColumnGroupTotals: 'before',
      pivotRowTotals: 'before',
      // suppressRowTransform: true,
      // minColWidth: 50,
      // maxColWidth: 300,
      // rowBuffer: 10,
      // columnDefs: [],
      singleClickEdit: true,
      // suppressClickEdit: true,
      enterMovesDownAfterEdit: true,
      enterMovesDown: true,
      // domLayout: 'autoHeight',
      // domLayout: 'forPrint',
      // groupUseEntireRow: true, //one of [true, false]
      groupDefaultExpanded: 2, //one of [true, false], or an integer if greater than 1
      // headerHeight: 100, // set to an integer, default is 25, or 50 if grouping columns
      // groupSuppressAutoColumn: true,
      // groupSuppressBlankHeader: true,
      // suppressMovingCss: true,
      // suppressMovableColumns: true,
      // groupIncludeFooter: true,
      ///suppressColumnMoveAnimation: suppressColumnMoveAnimation(),-----priyanka
      // suppressRowHoverHighlight: true,
      // suppressTouch: true,
      // suppressDragLeaveHidesColumns: true,
      // suppressMakeColumnVisibleAfterUnGroup: true,
      // unSortIcon: true,
      // enableRtl: true,
      multiSortKey: 'ctrl',
      animateRows: true,
      enableColResize: true, //one of [true, false]
      enableSorting: true, //one of [true, false]
      enableFilter: true, //one of [true, false]
      enableRangeSelection: true,
      rowSelection: "multiple", // one of ['single','multiple'], leave blank for no selection
      rowDeselection: true,
      quickFilterText: null,
      groupSelectsChildren: true, // one of [true, false]
      pagination: true,

      // embedFullWidthRows: true,
      // groupSelectsFiltered: true,
      suppressRowClickSelection: true, // if true, clicking rows doesn't select (useful for checkbox selection)
      // suppressColumnVirtualisation: true,
      // suppressContextMenu: true,
      //suppressFieldDotNotation: true,
      autoGroupColumnDef: groupColumn,
      // suppressCellSelection: true,
      // suppressMultiSort: true,
      // scrollbarWidth: 20,
      sideBar: true,
      // showToolPanel: true,//window.innerWidth > 1000,
      // toolPanelSuppressColumnFilter: true,
      // toolPanelSuppressColumnSelectAll: true,
      // toolPanelSuppressColumnExpandAll: true,
      //  autoSizePadding: 20,
      // toolPanelSuppressGroups: true,
      // toolPanelSuppressValues: true,
      // groupSuppressAutoColumn: true,
      // contractColumnSelection: true,
      // groupAggFields: ['bankBalance','totalWinnings'],
      groupMultiAutoColumn: true,
      groupHideOpenParents: true,
      // suppressMenuFilterPanel: true,
      // clipboardDeliminator: ',',
      // suppressMenuMainPanel: true,
      // suppressMenuColumnPanel: true,
      // suppressMenuHide: true,
      // forPrint: true,
      // rowClass: function(params) { return (params.data.country === 'Ireland') ? "theClass" : null; },
      // headerCellRenderer: headerCellRenderer_text,
      // headerCellRenderer: headerCellRenderer_dom,
      onRowSelected: this.rowSelected, //callback when row selected
      onSelectionChanged: this.selectionChanged, //callback when selection changed,
      aggFuncs: {
        'zero': function () {
          return 0;
        }
      },
      
      // rowHeight: 100,
      // suppressTabbing: true,
      // rowHoverClass: true,
      // suppressAnimationFrame: true,

      // callback when row clicked
      //     stopEditingWhenGridLosesFocus: true,
      onRowClicked: function (params) {
        
        // console.log("Callback onRowClicked: " + (params.data?params.data.name:null) + " - " + params.event);
      },
      onDisplayedColumnsChanged:function (params) {
        this.valuechange();
        this.IsUpdateview=1;
      
        //alert(params)
        // console.log("Callback onRowClicked: " + (params.data?params.data.name:null) + " - " + params.event);
      },
      onSortChanged: function (params) {
          console.log("Callback onSortChanged");
      },
      onRowDoubleClicked: function (params) {
        // console.log("Callback onRowDoubleClicked: " + params.data.name + " - " + params.event);
      },
      onGridSizeChanged: function (params) {
        console.log("Callback onGridSizeChanged: ", params);
      },
      // callback when cell clicked
      onCellClicked: function (params) {
        // console.log("Callback onCellClicked: " + params.value + " - " + params.colDef.field + ' - ' + params.event);
      },
      onColumnVisible: function (event) {
        console.log("Callback onColumnVisible:", event);
      },
      onColumnResized: function (event) {
        console.log("Callback onColumnResized:", event);
      },
      onCellValueChanged: function (params) {
        console.log("Callback onCellValueChanged:", params);
      },
      onRowDataChanged: function (params) {
        console.log('Callback onRowDataChanged: ');
      },
      // callback when cell double clicked
      onCellDoubleClicked: function (params) {
        // console.log("Callback onCellDoubleClicked: " + params.value + " - " + params.colDef.field + ' - ' + params.event);
      },
      // callback when cell right clicked
      onCellContextMenu: function (params) {
        console.log("Callback onCellContextMenu: " + params.value + " - " + params.colDef.field + ' - ' + params.event);
      },
      onCellFocused: function (params) {
        // console.log('Callback onCellFocused: ' + params.rowIndex + " - " + params.colIndex);
      },
      onPasteStart: function (params) {
        console.log('Callback onPasteStart:', params);
      },
      onPasteEnd: function (params) {
        console.log('Callback onPasteEnd:', params);
      },
      onGridReady: function (event) {

        console.log('Callback onGridReady: api = ' + event.api);
        //  this.gridApi = event.api;
        //this.gridColumnApi = event.columnApi;


        event.api.addGlobalListener(function (type, event) {
          console.log('type ' + type);
          console.log('event ' + event)
        });

      },
      onRowGroupOpened: function (event) {
        console.log('Callback onRowGroupOpened: node = ' + event.node.key + ', ' + event.node.expanded);
      },
      onRangeSelectionChanged: function (event) {
        // console.log('Callback onRangeSelectionChanged: finished = ' + event.finished);
      },
 
     
    };
    this.createGrid();
  }
valuechange()
{
  this.IsUpdateview=1;
  
}
  getSessionData() {

    this.foundationId = JSON.parse(localStorage.getItem('foundationId'));
    this.foundationname = JSON.parse(localStorage.getItem('foundationName'));
  }
  logout() {
    //this.authService.logout();
    //localStorage.removeItem('foundationId');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  rowSelected(event) {
    // the number of rows selected could be huge, if the user is grouping and selects a group, so
    // to stop the console from clogging up, we only print if in the first 10 (by chance we know
    // the node id's are assigned from 0 upwards)
    if (event.node.id < 10) {
      var valueToPrint = event.node.group ? 'group (' + event.node.key + ')' : event.node.data.name;
      console.log("Callback rowSelected: " + valueToPrint + " - " + event.node.isSelected());
    }
  }
  selectionChanged(event) {
    console.log('Callback selectionChanged: selection count = ' + this.gridOptions.api.getSelectedNodes().length);
  }
 
  ngOnInit() {
    attachSumoSelect();
    this.searchView = this.fb.group({

      view: new FormControl('')

    });

    this.initialDataAdmin();

  }

  initialDataAdmin() {
    this.getSessionData();
  }
  createGrid() {

    let eGridDiv: HTMLElement = document.querySelector('#myGrid');

    new Grid(eGridDiv, this.gridOptions);
    aggridcss();
  }
  restoreState(id, name) {
    this.getgridViewStateParam = [];
    this.getgridViewStateParam.push({ Id: id, FoundationId: parseInt(this.foundationId) })
    this.masterService.GetgridViewState(this.getgridViewStateParam, id, this.foundationId).subscribe(
      data => {
        this.choosedView = name;
        this.setGridState(data)
      }
    )

  }
  getSavedView() {
    this.getgridViewStateParam = [];
    this.getgridViewStateParam.push({ Id: 0, FoundationId: parseInt(this.foundationId) })
    this.masterService.GetgridViewState(this.getgridViewStateParam, 0, this.foundationId).subscribe(
      data => {
        this.viewlist = data;
      }
    )
  }
  getDefaultState(name) {
    var defaultGridViewState = [];
    defaultGridViewState = JSON.parse(localStorage.getItem('defaultGridViewState'));

    console.log(defaultGridViewState)
    this.setGridState(defaultGridViewState);
    this.choosedView = name;

  }
  saveDefaultState() {
    this.getGridViewState();
    localStorage.setItem('defaultGridViewState', JSON.stringify(this.inputGridViewstate));
    console.log(JSON.stringify(this.inputGridViewstate))

  }
  setGridState(data) {

    this.gridOptions.columnApi.setPivotMode(data[0].IsPivotMode)
    this.gridOptions.columnApi.setColumnState(JSON.parse(data[0].ColState));
    this.gridOptions.columnApi.setColumnGroupState(JSON.parse(data[0].GroupState));
    this.gridOptions.api.setSortModel(JSON.parse(data[0].SortState));
    this.gridOptions.api.setFilterModel(JSON.parse(data[0].FilterState));
  }
  getGridViewState() {
    var isPivotMode = this.gridOptions.columnApi.isPivotMode();
    var colState = this.gridOptions.columnApi.getColumnState();
    var groupState = this.gridOptions.columnApi.getColumnGroupState();
    var sortState = this.gridOptions.api.getSortModel();
    var filterState = this.gridOptions.api.getFilterModel();
    //var autosize = this.gridOptions.columnApi.getState();
    console.log(colState)
    this.inputGridViewstate = []
    this.inputGridViewstate.push(
      {
        Id: this.selectedViewId, UserId: 1, ViewName: this.viewname, FoundationId: parseInt(this.foundationId), ViewId: "1"
        , ColState: JSON.stringify(colState), GroupState: JSON.stringify(groupState), SortState: JSON.stringify(sortState)
        , FilterState: JSON.stringify(filterState), IsPivotMode: isPivotMode
        , IsDefault: true, IsDeleted: false
      }

    )
  }
  updateState()
  {
    this.IsUpdated=true;
    this.IsDeleted=false;

    this.getGridViewState()
    this.masterService.SaveGridViewState(this.inputGridViewstate).subscribe(
      data => {
        this.response = data;
        var msg = ""
        // alert(data)
        
          this.hideDialog();
          msg = this.viewname + " saved";
          this.gridStateMsg.push({ severity: "success", summary: '', detail: msg });
          this.viewname = "";
          this.getSavedView();
       


      })

    error => {

      console.error("Error updating status!");
    }
 
  }
  saveState() {
    this.IsUpdated=true;
    this.IsDeleted=false;

    this.getGridViewState()
    this.masterService.SaveGridViewState(this.inputGridViewstate).subscribe(
      data => {
        this.response = data;
        var msg = ""
        // alert(data)
        if (data == "0") {
          this.hideDialog();
          msg = this.viewname + " saved";
          this.gridStateMsg.push({ severity: "success", summary: '', detail: msg });
          this.viewname = "";
          this.getSavedView();
        } else {
          this.selectedViewId = data;
          msg = 'A view named ' + '"' + this.viewname + '"' + ' already exists.Replace?'
          this.showConfirmDialogue(msg)
        }


      })

    error => {

      console.error("Error updating status!");
    }


  }
  showConfirmDialogue(msg) {
    this.display = true;
    this.confirmMsg = msg;
  }
  hideDialog() {
    this.display = false;
  }
  deleteConfirm(viewid, viewname) {
    this.IsUpdated=false;
    this.IsDeleted=true;
    this.selectedViewId=viewid;
    this.selectedViewName=viewname;
    var msg = "Are you sure you want to delete " + '"' + this.selectedViewName + '"' + "?"
    this.showConfirmDialogue(msg);
  }
  deleteGridViewState() {
    this.masterService.DeleteGridViewState(this.selectedViewId).subscribe(
      data => {
        this.response = data;
        // alert(this.response)
        this.hideDialog();
        var msg = this.selectedViewName + " deleted";
        this.gridStateMsg.push({ severity: "success", summary: '', detail: msg });
        this.getSavedView();

      })

    error => {

      console.error("Error updating status!");
    }
  }
  resetValue()
  {
    this.selectedViewId=0;
    this.selectedViewName="";
    this.IsUpdated=true;
    this.IsDeleted=false;
  }
  onDropDownChange() {

    this.createGridOption();

  }
  toggleAllSelection() {

    if (this.allViewSelected.selected) {
      this.searchView.controls.view
        .patchValue([...this.listView.map(item => item.value), 0]);
    } else {
      this.searchView.controls.view.patchValue([]);
    }
    this.selectedDropdownView = this.searchView.controls.view.value;


  }
  togglePerOne() {


    if (this.allViewSelected.selected) {
      this.allViewSelected.deselect();
      this.selectedDropdownView = this.searchView.controls.view.value;
      //this.createRowData();
      return false;
    }
    if (this.searchView.controls.view.value.length == this.listView.length) {
      this.allViewSelected.select();

    }
    this.selectedDropdownView = this.searchView.controls.view.value;
    //this.createRowData();
    this.getDefaultState("Default view")
  }
  bindViewDropdown() {
    var temp = []
    this.listView = [];
    temp = this.colDatavalues

    var splitviewname = []
    for (var j = 0; j < Object.keys(temp).length; j++) {

      splitviewname = Object.keys(temp)[j].split('|')
      this.listView.push({
        value: splitviewname[1],
        label: splitviewname[0]
      });
    }

    this.selectedDropdownView = [this.listView[0].value]


  }
  createColumnDefs() {

    var temp = []
    var coldef = [];

    temp = this.colDatavalues

    var splitviewname = []
    var headername, headerDataType;
    var splitattributename = []
    var agfilter = "agSetColumnFilter"
    for (var j = 0; j < Object.keys(temp).length; j++) {
      splitviewname = Object.keys(temp)[j].split('|')
      var tempchild = []
      var attributename = []
      var attributecategory = []

      if (splitviewname[1] == this.selectedDropdownView) {
        var myObjects = Object.keys(temp).map(itm => temp[itm]);

        tempchild = myObjects[j]
        var categorytempchild = []
        for (var l = 0; l < Object.keys(tempchild).length; l++) {

          attributename = []
          attributecategory = []
          var categorytempchildtmp = Object.keys(tempchild).map(itm => tempchild[itm]);

          categorytempchild = categorytempchildtmp[l]
          for (var m = 0; m < Object.keys(categorytempchild).length; m++) {
            attributecategory = []
            var tmlastarr = Object.keys(categorytempchild).map(itm => categorytempchild[itm]);
            //var count = tmlastarr[m].length
            var count = Object.keys(categorytempchild).length
            for (var k = 0; k < count; k++) {

            //  splitattributename = tmlastarr[m][k].split('|');
              splitattributename = tmlastarr[k].split('|');
              agfilter = "agSetColumnFilter"
              headername = splitattributename[0]
              headerDataType = splitattributename[1]
              if (headerDataType == "Date") {
                agfilter = "agDateColumnFilter"
              }

              var Isfilter = splitattributename[2].toLowerCase() == 'true' ? false : true;
              if (headerDataType == "Date") {
                attributecategory.push({
                  headerName: headername, field: headername, suppressFilter: Isfilter, filter: agfilter
                  , width: 120, editable: false, floatCell: true, enableValue: true, enableRowGroup: true
                  , cellClass: 'ag-grid-cellClass', enablePivot: true, cellStyle: { textAlign: "center" },
                  filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                      console.log(filterLocalDateAtMidnight)
                      var dateAsString = cellValue;
                      if (dateAsString == null) return -1;
                      var dateParts = dateAsString.split("/");
                      //var day = Number(dateParts[1]);
                      // var month = Number(dateParts[0]) ;
                      // var year = Number(dateParts[2]);
                      // var cellDate1 = new Date(day,month,year);
                      //  var cellDate2= new Date(year,month,day);

                      var cellDate = new Date(Number(dateParts[2]), Number(dateParts[0]), Number(dateParts[1]));

                      if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                        return 0
                      }

                      if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                      }

                      if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                      }
                    },
                    browserDatePicker: true
                  }
                })
              } else if (headerDataType == "Amount") {
                attributecategory.push({
                  headerName: headername, field: headername, suppressFilter: Isfilter, filter: agfilter
                  , enablePivot: true, enableRowGroup: true, width: 120, editable: false, floatCell: true, enableValue: true, cellClass: 'ag-grid-cellNumber'
                  , cellStyle: { textAlign: "right" }, valueFormatter: function (cellValue) {

                    if (cellValue.value == null) {

                      return "";
                    } else {

                      return "$" + parseFloat(cellValue.value).toFixed(2)
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

                    }
                  }
                })
              } else {
                attributecategory.push({
                  headerName: headername, field: headername, suppressFilter: Isfilter, filter: agfilter
                  , enablePivot: true, enableRowGroup: true, width: 120, editable: false, floatCell: true, enableValue: true, cellClass: 'ag-grid-cellClass'

                })
              }
            }
           // attributename.push({ headerName: Object.keys(categorytempchild)[m], children: attributecategory })

          }
          coldef.push({ headerName: Object.keys(tempchild)[l], children: attributecategory })
        //  coldef.push({ headerName: Object.keys(tempchild)[l], children: attributename })
        }

      }

    }

    return coldef;

  }
  createColumnDefs_old() {

    var temp = []
    var coldef = [];

    temp = this.colDatavalues

    var splitviewname = []
    var headername, headerDataType;
    var splitattributename = []
    var agfilter = "agSetColumnFilter"
    for (var j = 0; j < Object.keys(temp).length; j++) {
      splitviewname = Object.keys(temp)[j].split('|')
      var tempchild = []
      var attributename = []
      var attributecategory = []

      if (splitviewname[1] == this.selectedDropdownView) {
        var myObjects = Object.keys(temp).map(itm => temp[itm]);

        tempchild = myObjects[j]
        var categorytempchild = []
        for (var l = 0; l < Object.keys(tempchild).length; l++) {

          attributename = []
          attributecategory = []
          var categorytempchildtmp = Object.keys(tempchild).map(itm => tempchild[itm]);

          categorytempchild = categorytempchildtmp[l]
          for (var m = 0; m < Object.keys(categorytempchild).length; m++) {
            attributecategory = []
            var tmlastarr = Object.keys(categorytempchild).map(itm => categorytempchild[itm]);
            var count = tmlastarr[m].length

            for (var k = 0; k < count; k++) {

              splitattributename = tmlastarr[m][k].split('|');
              agfilter = "agSetColumnFilter"
              headername = splitattributename[0]
              headerDataType = splitattributename[1]
              if (headerDataType == "Date") {
                agfilter = "agDateColumnFilter"
              }

              var Isfilter = splitattributename[2].toLowerCase() == 'true' ? false : true;
              if (headerDataType == "Date") {
                attributecategory.push({
                  headerName: headername, field: headername, suppressFilter: Isfilter, filter: agfilter
                  , width: 120, editable: false, floatCell: true, enableValue: true, enableRowGroup: true
                  , cellClass: 'ag-grid-cellClass', enablePivot: true, cellStyle: { textAlign: "center" },
                  filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                      console.log(filterLocalDateAtMidnight)
                      var dateAsString = cellValue;
                      if (dateAsString == null) return -1;
                      var dateParts = dateAsString.split("/");
                      //var day = Number(dateParts[1]);
                      // var month = Number(dateParts[0]) ;
                      // var year = Number(dateParts[2]);
                      // var cellDate1 = new Date(day,month,year);
                      //  var cellDate2= new Date(year,month,day);

                      var cellDate = new Date(Number(dateParts[2]), Number(dateParts[0]), Number(dateParts[1]));

                      if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
                        return 0
                      }

                      if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                      }

                      if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                      }
                    },
                    browserDatePicker: true
                  }
                })
              } else if (headerDataType == "Amount") {
                attributecategory.push({
                  headerName: headername, field: headername, suppressFilter: Isfilter, filter: agfilter
                  , enablePivot: true, enableRowGroup: true, width: 120, editable: false, floatCell: true, enableValue: true, cellClass: 'ag-grid-cellNumber'
                  , cellStyle: { textAlign: "right" }, valueFormatter: function (cellValue) {

                    if (cellValue.value == null) {

                      return "";
                    } else {

                      return "$" + parseFloat(cellValue.value).toFixed(2)
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

                    }
                  }
                })
              } else {
                attributecategory.push({
                  headerName: headername, field: headername, suppressFilter: Isfilter, filter: agfilter
                  , enablePivot: true, enableRowGroup: true, width: 120, editable: false, floatCell: true, enableValue: true, cellClass: 'ag-grid-cellClass'

                })
              }
            }
            attributename.push({ headerName: Object.keys(categorytempchild)[m], children: attributecategory })

          }
          coldef.push({ headerName: Object.keys(tempchild)[l], children: attributename })
        }

      }

    }

    return coldef;

  }
  currencyFormatter(params) {
    if (params.value > 0) {
      return "\xA3" + this.formatNumber(params.value);
    } else {
      return "\xA3" + (params.value);
    }

  }
  formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }



  // specify the data

  createRowDefs() {
    return this.rowDatavalues;
  }


  createCoulmnData() {

    this.masterService.GetGridViewStructure().subscribe(
      data => {
        this.colDatavalues = data;
        var temp = []
        temp = data;
        console.log(Object.keys(temp)[0])
        this.bindViewDropdown();
        this.getSavedView();
        this.createRowData()
      }
    )

  }
  createRowData() {

    this.masterService.GetGridViewData(this.foundationId, this.selectedDropdownView).subscribe(
      data => {
        this.rowDatavalues = data;
        this.createGridOption()
        this.saveDefaultState();
      }
    )

  }
}
