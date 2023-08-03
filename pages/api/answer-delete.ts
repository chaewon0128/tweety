import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOption } from "../../lib/sessionOption";


declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number
        }
    }
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    {
        const {
            body: { id, userId },
            session: { user },
        } = req;

        if (req.method !== "DELETE") return;

        if (userId === user?.id) {
            await db?.answer.delete({
                where: {
                    id: +id.toString(),
                }
            })
            res.json({
                status: 200,
                message: "답글이 삭제 되었습니다."
            })
        } else {
            res.json({
                status: 400,
                message: "본인 답글만 삭제 가능합니다."
            })
        }
        console.log(id, userId, user)
    }

}
export default withIronSessionApiRoute(handler, sessionOption)