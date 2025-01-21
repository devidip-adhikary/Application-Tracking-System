export type Candidates = {
  id?: number, //Unique Id
  name: string;
  email: string;
  ph_no: string;
  current_company?: string;
  YOE: string;
  RYOE: string;
  notice_period: string;
  cur_location: string;
  pref_location: string;
  current_ctc: string;
  expected_ctc: string;
  lwd: Date | null;
  opening?: number;
  vendor_id: number;
  status?: string;
  resume?: File | null;
};
