import { Component, OnInit } from '@angular/core';
import { Grid, GridOptions } from "ag-grid-community";
//import {Grid} from "ag-grid-enterprise/src/main";
// import "ag-grid/dist/styles/ag-grid.css";
// import "ag-grid/dist/styles/ag-theme-balham.css";
import { MasterService } from '../app/_services/masterdata.service'
import { ProgramList } from '../app/_models/masterdata.model'
import 'ag-grid-enterprise';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MasterService]
})
export class AppComponent implements OnInit {
    private gridOptions: GridOptions = <GridOptions>{};
    selectedView: string = '0';
    listProgram: ProgramList[];
    title = 'my-app';
    count = 0;
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

    constructor(private masterService: MasterService) {

     
     this.createGridOption()


    }
    createGridOption()
    {
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
            columnDefs: this.createColumnDefs(),
            rowData: this.createRowData(),
            statusBar: {
                statusPanels: [
                    { statusPanel: 'agTotalAndFilteredRowCountComponent', key: 'totalAndFilter', align: 'left' },
                    { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                    { statusPanel: 'agAggregationComponent', align: 'right' }
                ]
            },
            components: {
                //  personFilter: PersonFilter,--priyanka
                //  personFloatingFilterComponent: PersonFloatingFilterComponent,--priyanka
                countryCellRenderer: this.countryCellRenderer,
                // countryFloatingFilterComponent: CountryFloatingFilterComponent,priyanka
                booleanCellRenderer: this.booleanCellRenderer,
                booleanFilterCellRenderer: this.booleanFilterCellRenderer,
                // winningsFilter: WinningsFilter,--priyanka
                ratingRenderer: this.ratingRenderer,
                ratingFilterRenderer: this.ratingFilterRenderer
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
            // singleClickEdit: true,
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
            // pagination: true,
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
                //event.api.addGlobalListener(function(type, event) {
                //    console.log('event ' + type);
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
    }
    GetAllCarTable() {
        this.masterService.GetAllCarTable().subscribe(
            data => {
                var car = data;
                var temp = []
                for (var i = 0; i < car.length; i++) {
                    console.log(Object.keys(car)[i], Object.values(car)[i])
                    temp = car[i];
                    for (var j = 0; j < Object.keys(temp).length; j++) {
                        console.log(Object.keys(temp)[j], Object.values(temp)[j])
                    }

                }

            }
        )
    }
    countryCellRenderer(params) {
        //get flags from here: http://www.freeflagicons.com/
        if (params.value === "" || params.value === undefined || params.value === null) {
            return '';
        } else {
            var flag = '<img class="flag" border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + this.COUNTRY_CODES[params.value] + '.png">';
            return flag + ' ' + params.value;
        }
    }
    booleanCellRenderer(params) {
        this.count++;
        if (this.count <= 1) {
            // params.api.onRowHeightChanged();
        }

        var valueCleaned = this.booleanCleaner(params.value);
        if (valueCleaned === true) {
            return "<span title='true' class='ag-icon ag-icon-tick content-icon'></span>";
        } else if (valueCleaned === false) {
            return "<span title='false' class='ag-icon ag-icon-cross content-icon'></span>";
        } else if (params.value !== null && params.value !== undefined) {
            return params.value.toString();
        } else {
            return null;
        }
    }
    booleanCleaner(value) {
        if (value === "true" || value === true || value === 1) {
            return true;
        } else if (value === "false" || value === false || value === 0) {
            return false;
        } else {
            return null;
        }
    }
    booleanFilterCellRenderer(params) {
        var valueCleaned = this.booleanCleaner(params.value);
        if (valueCleaned === true) {
            return "<span title='true' class='ag-icon ag-icon-tick content-icon'></span>";
        } else if (valueCleaned === false) {
            return "<span title='false' class='ag-icon ag-icon-cross content-icon'></span>";
        } else {
            return "(empty)";
        }
    }
    ratingFilterRenderer(params) {
        return this.ratingRendererGeneral(params.value, true)
    }

    ratingRenderer(params) {
        return this.ratingRendererGeneral(params.value, false)
    }

    ratingRendererGeneral(value, forFilter) {
        var result = '<span>';
        for (var i = 0; i < 5; i++) {
            if (value > i) {
                result += '<img src="images/star.svg" class="star" width=12 height=12 />';
            }
        }
        if (forFilter && value === 0) {
            result += '(no stars)';
        }
        result += '</span>';
        return result;
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
        this.GetAllCarTable();
        this.listProgram = [];
        var temp = []
        var car = [];
        car = [{
            "GRANT VIEW":
            {
                "Dimention": ["id", "status", "rohit", "priyanka"],
                "Measure": ["id", "status", "rohit", "priyanka", "prateek"]
            },
            "RESULT VIEW":
            {
                "Dimention": ["id", "status", "rohit","prateek"],
                "Measure": ["id", "status", "rohit", "priyanka", ]
            }
        }]
        for (var i = 0; i < car.length; i++) {
            console.log(Object.keys(car)[i], Object.values(car)[i])
            temp = car[i];
            for (var j = 0; j < Object.keys(temp).length; j++) {
                console.log(Object.keys(temp)[j], Object.values(temp)[j])
                this.listProgram.push({
                    value: Object.keys(temp)[j],
                    label: Object.keys(temp)[j]
                });
            }

        }
         this.createGrid();

    }
    createGrid()
    {
        
        let eGridDiv: HTMLElement = document.querySelector('#myGrid');

        new Grid(eGridDiv, this.gridOptions);
    }
    onDropDownChange()
    {
     //   alert(this.selectedView)
        this.createGridOption();
        this.createGrid();
    }
    createColumnDefs()
    {
        var temp = []
        var car = [];
        var coldef=[];
        car = [{
            "GRANT VIEW":
            {
                "Dimension": ["make", "model", "price"],
                "Measure":  ["make", "price"]
            },
            "RESULT VIEW":
            {
                "Dimension":  ["make1", "model", "price"],
                "Measure": ["make", "model", "price"]
            }
        }]
        for (var i = 0; i < car.length; i++) {
            console.log(Object.keys(car)[i], Object.values(car)[i])
            temp = car[i];
            for (var j = 0; j < Object.keys(temp).length; j++) {
                console.log(Object.keys(temp)[j], Object.values(temp)[j])
                var tempchild = []
                var child = []
                if(this.selectedView=='0')
                {
                    this.selectedView="GRANT VIEW";
                }
                if( Object.keys(temp)[j]==this.selectedView)
                {
                  
                    console.log( Object.values(temp)[j])
                    tempchild=Object.values(temp)[j];
                    for (var j = 0; j < Object.keys(tempchild).length; j++) {
                        //alert(Object.keys(tempchild)[j])
                        child = []
                        for(var k=0;k<Object.values(tempchild)[j].length;k++)
                        {
                            child.push({
                                headerName:Object.values(tempchild)[j][k], field: Object.values(tempchild)[j][k]
                                , width: 120, editable: true, floatCell: true, enableRowGroup: true, enablePivot: true, enableValue: true,
                
                                filterParams: {
                                    selectAllOnMiniFilter: true,
                                    newRowsAction: 'keep',
                                    clearButton: true 
                            }})
                           // alert(Object.values(tempchild)[j][k])
                        }
                        coldef.push({ headerName:Object.keys(tempchild)[j],children:child})
                    }
                    
                }
               
            }
            return coldef;

        }
    }

    // specify the columns
    createColumnDefsold() {
        return [
            {
                headerName: "Athlete Details",
                children: [
               { headerName: "Make", field: "make"
                , width: 120, editable: true, floatCell: true, enableRowGroup: true, enablePivot: true, enableValue: true,

                filterParams: {
                    selectAllOnMiniFilter: true,
                    newRowsAction: 'keep',
                    clearButton: true

                    //, cellRenderer: 'ratingRenderer'
                }
            }
            ]
            },
            {
                headerName: "Model", field: "model"
                , width: 120, editable: true, floatCell: true, enableRowGroup: true, enablePivot: true, enableValue: true,
                filterParams: {
                    selectAllOnMiniFilter: true,
                    newRowsAction: 'keep',
                    clearButton: true,

                    //, cellRenderer: 'ratingRenderer'
                }
            },

            {
                headerName: "Price", field: "price"
                , width: 120, editable: true, floatCell: true, enableRowGroup: true, enablePivot: true, enableValue: true,

                filterParams: {
                    selectAllOnMiniFilter: true,
                    newRowsAction: 'keep',
                    clearButton: true,

                    //, cellRenderer: 'ratingRenderer'
                }
            }
        ];
    }

    // specify the data
    createRowData() {
        return [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 },
            { make: "Porsche", model: "Boxter1", price: 72000 }
        ];
    }
}


