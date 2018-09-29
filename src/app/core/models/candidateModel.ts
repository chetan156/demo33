import { ITechnicalSkillsModel } from './technicalSkillsModel';


export interface CandidateModel {
    candidateId: number;
    jobPostingId: number;
    firstName: string;
    lastName: string;
    emailId: string;
    alternateEmailId: string;
    primaryContactNumber: string;
    secondaryContactNumber: string;
    createdBy: number;
    modifiedBy: number;
    createdDate: string;
    modifiedDate: string;
    files: any;
    candidateTechnicalSkills: ITechnicalSkillsModel[];
}


export interface CandidateFiles {
    files: FormData;
    id: string;
}

export class Candidate {
    constructor(
       public candidateId: number,
       public jobPostingId: number,
       public firstName: string,
       public lastName: string,
       public emailId: string,
       public alternateEmailId: string,
       public primaryContactNumber: string,
       public secondaryContactNumber: string,
       public createdBy: string,
       public modifiedBy: string
    ) { }
  }
