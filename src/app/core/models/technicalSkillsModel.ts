export interface ITechnicalSkillsModel {
    technicalSkillID: number;
    technicalSkillName: string;
    departmentID: number;
    departmentName: string;
    createdBy: number;
    createdDate?: Date;
    modifiedBy?: number;
    modifiedDate?: Date;
}
