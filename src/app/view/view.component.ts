import { Component, OnInit,ViewChild } from '@angular/core';
import { Grid, GridOptions } from "ag-grid-community";
//import {Grid} from "ag-grid-enterprise/src/main";
// import "ag-grid/dist/styles/ag-grid.css";
// import "ag-grid/dist/styles/ag-theme-balham.css";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterService } from '../../app/_services/masterdata.service'
import { InputGridViewstate } from '../../app/_models/masterdata.model'
import  "ag-grid-enterprise"; 
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [MasterService]
})
export class ViewComponent implements OnInit {
  @ViewChild('allViewSelected') private allViewSelected: MatOption;
  searchView: FormGroup;
  private gridApi;
  private gridColumnApi;
  response: string;
  foundationname:string="foundation name"
  inputGridViewstate: InputGridViewstate[] = [];
  private gridOptions: GridOptions = <GridOptions>{};
  foundationId: string;
  selectedView: string[];
  listView: SelectItem[];
  title = 'my-app';
  count = 0;
  rowDatavalues: [];
  colDatavalues: [];
  COUNTRY_CODES = {
    Ireland: "ie",
    Luxembourg: "lu",
    Belgium: "be",
    Spain: "es",
    "United Kingdom": "gb",
    France: "fr",
    Germany: "de",
    Sweden: "se",
    Italy: "it",
    Greece: "gr",
    Iceland: "is",
    Portugal: "pt",
    Malta: "mt",
    Norway: "no",
    Brazil: "br",
    Argentina: "ar",
    Colombia: "co",
    Peru: "pe",
    Venezuela: "ve",
    Uruguay: "uy"
  };
  test: string;

  constructor(private fb: FormBuilder,private router: Router, private masterService: MasterService) {

    this.createCoulmnData()
    // this.createGridOption()
  }
  createGridOption() {

    var groupColumn = {
      headerName: "Group",
      width: 200,
      field: 'name',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true
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
      defaultColDef: {
        minWidth: 50
      },
      enableCellChangeFlash: true,
      rowDragManaged: true,
      pivotMode: true,

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
      // groupDefaultExpanded: 9999, //one of [true, false], or an integer if greater than 1
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
      // groupMultiAutoColumn: true,
      // groupHideOpenParents: true,
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
      getBusinessKeyForNode: function (node) {
        if (node.data) {
          return node.data.name;
        } else {
          return '';
        }
      },
      defaultGroupSortComparator: function (nodeA, nodeB) {
        if (nodeA.key < nodeB.key) {
          return -1;
        } else if (nodeA.key > nodeB.key) {
          return 1;
        } else {
          return 0;
        }
      },
      // rowHeight: 100,
      // suppressTabbing: true,
      // rowHoverClass: true,
      // suppressAnimationFrame: true,
      //     pinnedTopRowData: [
      //         {name: 'Mr Pinned Top 1', language: 'English', country: 'Ireland', continent:"Europe", game:{name:"Hare and Hounds",bought:"true"}, totalWinnings: 342424, bankBalance:75700.9,rating:2,jan:20478.54,feb:2253.06,mar:39308.65,apr:98710.13,may:96186.55,jun:91925.91,jul:1149.47,aug:32493.69,sep:19279.44,oct:21624.14,nov:71239.81,dec:80031.35},
      //         {name: 'Mr Pinned Top 2', language: 'English', country: 'Ireland', continent:"Europe", game:{name:"Hare and Hounds",bought:"true"}, totalWinnings: 342424, bankBalance:75700.9,rating:2,jan:20478.54,feb:2253.06,mar:39308.65,apr:98710.13,may:96186.55,jun:91925.91,jul:1149.47,aug:32493.69,sep:19279.44,oct:21624.14,nov:71239.81,dec:80031.35},
      //         {name: 'Mr Pinned Top 3', language: 'English', country: 'Ireland', continent:"Europe", game:{name:"Hare and Hounds",bought:"true"}, totalWinnings: 342424, bankBalance:75700.9,rating:2,jan:20478.54,feb:2253.06,mar:39308.65,apr:98710.13,may:96186.55,jun:91925.91,jul:1149.47,aug:32493.69,sep:19279.44,oct:21624.14,nov:71239.81,dec:80031.35},
      //         ],
      //     pinnedBottomRowData: [
      //         {name: 'Mr Pinned Bottom 1', language: 'English', country: 'Ireland', continent:"Europe", game:{name:"Hare and Hounds",bought:"true"}, totalWinnings: 342424, bankBalance:75700.9,rating:2,jan:20478.54,feb:2253.06,mar:39308.65,apr:98710.13,may:96186.55,jun:91925.91,jul:1149.47,aug:32493.69,sep:19279.44,oct:21624.14,nov:71239.81,dec:80031.35},
      //         {name: 'Mr Pinned Bottom 2', language: 'English', country: 'Ireland', continent:"Europe", game:{name:"Hare and Hounds",bought:"true"}, totalWinnings: 342424, bankBalance:75700.9,rating:2,jan:20478.54,feb:2253.06,mar:39308.65,apr:98710.13,may:96186.55,jun:91925.91,jul:1149.47,aug:32493.69,sep:19279.44,oct:21624.14,nov:71239.81,dec:80031.35},
      //         {name: 'Mr Pinned Bottom 3', language: 'English', country: 'Ireland', continent:"Europe", game:{name:"Hare and Hounds",bought:"true"}, totalWinnings: 342424, bankBalance:75700.9,rating:2,jan:20478.54,feb:2253.06,mar:39308.65,apr:98710.13,may:96186.55,jun:91925.91,jul:1149.47,aug:32493.69,sep:19279.44,oct:21624.14,nov:71239.81,dec:80031.35},
      //     ],
      // callback when row clicked
      //     stopEditingWhenGridLosesFocus: true,
      onRowClicked: function (params) {
        // console.log("Callback onRowClicked: " + (params.data?params.data.name:null) + " - " + params.event);
      },
      // onSortChanged: function (params) {
      //     console.log("Callback onSortChanged");
      // },
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


        // event.api.addGlobalListener(function(type, event) {
        //console.log('event ' + type);
        //});
      },
      onRowGroupOpened: function (event) {
        console.log('Callback onRowGroupOpened: node = ' + event.node.key + ', ' + event.node.expanded);
      },
      onRangeSelectionChanged: function (event) {
        // console.log('Callback onRangeSelectionChanged: finished = ' + event.finished);
      },
      getContextMenuItems: this.getContextMenuItems,
      excelStyles: [
        {
          id: 'good-score',
          interior: {
            color: "#C6EFCE", pattern: 'Solid'
          },
          numberFormat: {
            format: '[$$-409]#,##0'
          }
        },
        {
          id: 'bad-score',
          interior: {
            color: "#FFC7CE", pattern: 'Solid'
          },
          numberFormat: {
            format: '[$$-409]#,##0'
          }
        },
        {
          id: 'header',
          interior: {
            color: "#CCCCCC", pattern: 'Solid'
          }
        },
        {
          id: 'currencyCell',
          numberFormat: {
            format: '[$$-409]#,##0'
          }
        },
        {
          id: 'booleanType',
          dataType: 'boolean'
        }
      ]
    };
    this.createGrid();
  }
  getSessionData() {

    this.foundationId = JSON.parse(localStorage.getItem('foundationId'));
 
  }
  logout() {
    //this.authService.logout();
    localStorage.removeItem('foundationId');
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
  getContextMenuItems(params) {
    if (params.node == null) return null;
    var result = params.defaultItems.splice(0);
    result.push(
      {
        name: 'Custom Menu Item',
        icon: '<img src="images/lab.svg" style="width: 14px;"/>',
        //shortcut: 'Alt + M',
        action: function () {
          var value = params.value ? params.value : '<empty>';
          window.alert('You clicked a custom menu item on cell ' + value);
        }
      }
    );

    return result;
  }
  ngOnInit() {
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
  }
  restoreState() {


    this.masterService.GetgridViewState().subscribe(
      data => {

       this. setstate(data)
      }
    )

  }
  setstate(data)
  {
 
    this.gridOptions.columnApi.setPivotMode(data[0].IsPivotMode)
    this.gridOptions.columnApi.setColumnState(JSON.parse(data[0].ColState));
    this.gridOptions.columnApi.setColumnGroupState(JSON.parse(data[0].GroupState));
    this.gridOptions.api.setSortModel(JSON.parse(data[0].SortState));
    this.gridOptions.api.setFilterModel(JSON.parse(data[0].FilterState)); 
  }
  saveState() {
    var isPivotMode=this.gridOptions.columnApi.isPivotMode();
    var colState = this.gridOptions.columnApi.getColumnState();
    var groupState = this.gridOptions.columnApi.getColumnGroupState();
    var sortState = this.gridOptions.api.getSortModel();
    var filterState = this.gridOptions.api.getFilterModel();
    var autosize= this.gridOptions.columnApi.getState();

    this.inputGridViewstate=[]
    this.inputGridViewstate.push(
      {CoulmnName:"colState",CoulmnValue:JSON.stringify( colState)},
      {CoulmnName:"groupState",CoulmnValue:JSON.stringify(groupState)},
      {CoulmnName:"sortState",CoulmnValue:JSON.stringify(sortState)},
      {CoulmnName:"filterState",CoulmnValue:JSON.stringify(filterState)},
      {CoulmnName:"isPivotMode",CoulmnValue:isPivotMode.toString()}
    )
    this.masterService.SaveGridViewState(this.inputGridViewstate).subscribe(
      data => {
        this.response = data;
        alert(  this.response)

      })

    error => {
    //  this.showSuccessMsg('error', this.response)
      console.error("Error updating status!");
    }
    console.log(colState)

  }
  onDropDownChange() {
   // var viewId=Array.prototype.map.call(this.selectedView, function(item) { return item.value; }).join(","); // "A,B,C"
   //alert(viewId//)
    this.createGridOption();
    // this.createGrid();
  }
  toggleAllSelection() {

      if (this.allViewSelected.selected) {
        this.searchView.controls.view
          .patchValue([...this.listView.map(item => item.value), 0]);
      } else {
        this.searchView.controls.view.patchValue([]);
      }
      this.selectedView=this.searchView.controls.view.value;
     // this.createRowData();

  }
  togglePerOne( ) {

  
      if (this.allViewSelected.selected) {
        this.allViewSelected.deselect();
        this.selectedView=this.searchView.controls.view.value;
        //this.createRowData();
        return false;
      }
      if (this.searchView.controls.view.value.length == this.listView.length)
      {
        this.allViewSelected.select();
     
      }
      this.selectedView=this.searchView.controls.view.value;
      //this.createRowData();
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
    //this.selectedView = []
    this.selectedView = [this.listView[0].value] 


  }
  createColumnDefs() {

    var temp = []
    var coldef = [];

    temp = this.colDatavalues

    var splitviewname = []
    for (var j = 0; j < Object.keys(temp).length; j++) {
      splitviewname = Object.keys(temp)[j].split('|')
      var tempchild = []
      var attributename = []
      var attributecategory = []

      if (splitviewname[1] == this.selectedView) {
       var  myObjects = Object.keys(temp).map(itm => temp[itm]);
       //alert(myObjects)
        //console.log(Object.values(temp)[j])
       // tempchild = Object.values(temp)[j];
        tempchild=myObjects[j]
        var categorytempchild = []
        for (var l = 0; l < Object.keys(tempchild).length; l++) {
          //alert(Object.keys(tempchild)[j])
          attributename = []
          attributecategory = []
           //categorytempchild = Object.values(tempchild)[l]
           var categorytempchildtmp=Object.keys(tempchild).map(itm => tempchild[itm]);

          categorytempchild=categorytempchildtmp[l]
          for (var m = 0; m < Object.keys(categorytempchild).length; m++) {
            attributecategory = []
            var tmlastarr=Object.keys(categorytempchild).map(itm => categorytempchild[itm]);
            var count=tmlastarr[m].length
           // for (var k = 0; k < Object.values(categorytempchild)[m].length; k++) {
              for (var k = 0; k < count; k++) {
                var headername=tmlastarr[m][k]
               // alert(headernamearr)
              attributecategory.push({
                headerName: headername, field:headername
                , width: 120, editable: true, floatCell: true, enableRowGroup: true, enablePivot: true, enableValue: true,

                filterParams: {
                  selectAllOnMiniFilter: true,
                  newRowsAction: 'keep',
                  clearButton: true
                }
              })
              // alert(Object.values(tempchild)[j][k])
            }
            attributename.push({ headerName: Object.keys(categorytempchild)[m], children: attributecategory })

          }
          coldef.push({ headerName: Object.keys(tempchild)[l], children: attributename })
        }

      }

    }

    return coldef;

  }



  // specify the data

  createRowDefs() {
    return this.rowDatavalues;
  }


  createCoulmnData() {

    this.masterService.GetGridViewStructure().subscribe(
      data => {
        this.colDatavalues = data;
        // var gg=data;
        var temp = []
        temp = data;
        console.log(Object.keys(temp)[0])
        this.bindViewDropdown();
        this.createRowData()
      }
    )

  }
  createRowData() {
    //alert(this.selectedView)
  //  var viewId=Array.prototype.map.call(this.selectedView, function(item) { return item.value; }).join(","); // "A,B,C"
    this.masterService.GetGridViewData(this.foundationId,this.selectedView).subscribe(
      data => {
        this.rowDatavalues = data;

        this.createGridOption()
      }
    )
    this.masterService.GetFoundationName(this.foundationId).subscribe(
      data => {
       this.foundationname = data.toString();

      }
    )
    
  }
}
