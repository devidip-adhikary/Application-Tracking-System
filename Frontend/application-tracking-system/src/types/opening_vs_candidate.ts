export type OpeningVsCandidate = {
  id: number;
  opening_id: number;
  candidate_id: number;
  status_id: number;
  openings: {
    id: number;
    name: string;
    client_id: number;
    tech_stack_id: number;
    job_description: string;
    location: string;
    number_of_requiremnts: string;
    work_mode: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  candidate: {
    id: number;
    vendor_id: number;
    name: string;
    email: string;
    ph_no: string;
    current_company: string | null;
    YOE: string;
    RYOE: string;
    notice_period: string;
    cur_location: string;
    pref_location: string;
    current_ctc: string | null;
    expected_ctc: string | null;
    lwd: string | null;
    isActive: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};


