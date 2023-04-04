import z from "zod";

export const registerUserModel = z.object({
  body: z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    userName: z
      .string()
      .regex(
        /^[a-zA-Z0-9]{6,16}$/,
        "User Name Can Only Contain a-z, A-Z and 0-9. 6 to 16 characters."
      ),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
        "One Upper, One Lower, One Number, One Special. 8 to 16 characters."
      ),
  }),
});

export type REGISTER_USER_MODEL = z.infer<typeof registerUserModel>["body"];

export const loginUserModel = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
        "One Upper, One Lower, One Number, One Special. 8 to 16 characters."
      ),
  }),
});

export type LOGIN_USER_MODEL = z.infer<typeof loginUserModel>["body"];
