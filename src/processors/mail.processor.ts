import { mailService } from "../services";


export const sendMail = async (payload:any) => {
  const response = await mailService.sendMail({body:payload});
  return response;
};