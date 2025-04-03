import { Suspense } from "react"
import ResetPasswordPage from "./ResetPasswordPage"

const Page = () => {
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <ResetPasswordPage />
        </Suspense>
    )
}

export default Page