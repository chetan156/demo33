export interface IJobPostingModel {
    jobPostingId: number;
    jobCode: string;
    jobDescription: string;
    position: string;
    positionId: number;
    createdBy: number;
    createdDate?: Date;
    modifiedBy?: number;
    modifiedDate?: Date;
    expiryDate?: Date;
    isExpired: boolean;
}
