import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/app/(models)/User";
import { UserProp } from "@/app/(component)/UserForm";



 export interface CustomToken {
    role?: string; // Assuming 'role' is a string, adjust the type accordingly
    // Add other properties if needed
  }

  interface cred{
    email:string,
   password:string,
  }

  

export const options:NextAuthOptions={
    
    providers:[
        GithubProvider({  

            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_Secret as string,

            profile(profile) {
                console.log("Profile Github:", profile)

                let userRole="Github User"
                if(profile?.email=="pradhuman.singh@involead.com"){
                    userRole="admin"
                }

                return{
                    ...profile,
                    role:userRole,
                };
            }

        }),
        GoogleProvider({   
            clientId: process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_Secret as string,
            profile(profile) {
                console.log("Profile Google:", profile)

                let userRole="Google User"
                return{
                    ...profile,
                    id:profile.sub,
                    role:userRole,
                };
            }
        }),
        CredentialsProvider({
            name: "Credentials",
        credentials: {
              email: {
                label: "email:",
                type: "text",
                placeholder: "your-email",
              },
              password: {
                label: "password:",
                type: "password",
                placeholder: "your-password",
              },
            },
            async authorize(credentials,req):Promise<any> {
                try {
                  const foundUser = await User.findOne({ email: (credentials as cred).email })
                    .lean()
                    .exec();

                    if (foundUser && 'password' in foundUser) {
                        console.log("User Exists");
                        const match = await bcrypt.compare(
                          (credentials as cred).password,
                          foundUser.password
                        );
            
                        if (match) {
                          console.log("Good Pass");
                          delete foundUser.password;
            
                          foundUser["role"] = "Unverified Email";
                          return foundUser;
                        }
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    return null;
                  },
                }),
    ],
    secret: process.env.NEXTAUTH_SECRET || 'default-secret-key' as string,




    
    callbacks:{
        async jwt({token,user})
            {
                if(user) token.role=(user as CustomToken).role;
                return token;
            },
    async session({session,token})
    {
        if(session?.user) (session.user as CustomToken).role=(token as CustomToken).role;
        return session;
    }
},
}
