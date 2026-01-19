import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminIndex() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/admin/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user_type !== "admin") {
      redirect("/");
    }
    redirect("/admin/dashboard");
  } catch (err) {
    redirect("/admin/login");
  }
}
