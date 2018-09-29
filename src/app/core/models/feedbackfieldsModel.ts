export interface IFeedBackFieldsModel {
    feedbackFieldId: number;
    feedbackFieldName: string;
    technicalSkillID: number;
    technicalSkillName: string;
    createdBy: number;
    createdDate?: Date;
    modifiedBy?: number;
    modifiedDate?: Date;
}
