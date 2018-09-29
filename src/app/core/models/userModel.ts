export interface IUserModel {
    userId: number;
    emailId: string;
    password: string;
    firstName: string;
    lastName: string;
    primaryContactNumber: string;
    secondaryContactNumber: string;
    gender: string;
    skypeId: string;
    departmentId: number;
    designationId: number;
    isActive: boolean;
    createdBy: number;
    roleId: number;
    role: string;
}
