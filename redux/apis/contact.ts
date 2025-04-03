import API from "@/utils/config";

// Contact Form Submission
export const submitContact = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<{ message: string }> => {
  try {
    const response = await API.post("/api/contact", {
      name,
      email,
      subject,
      message,
    });

    return { message: response.data.message };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

// Get All Contact Messages (Admin Only)
export const getAllContacts = async (): Promise<any[]> => {
  try {
    const response = await API.get("/api/contact");
    return response.data;
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
};
