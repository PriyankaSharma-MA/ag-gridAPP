
export class FoundationList {
   Foundation_Id: number;
   Foundation_Name: string;
}


export class GetgridViewStateParam {
      Id :number;
      FoundationId :number;
}
export class InputGridViewstate {
      Id:number;
      UserId: number;
      ViewName: string;
      FoundationId: number;
      ViewId: string;
      ColState: string;
      GroupState: string;
      SortState: string;
      FilterState: string;
      IsPivotMode: boolean;
      IsDefault: boolean;
      IsDeleted: boolean;

}