import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProjectPostState {
    isPopupOpen: boolean;
    stepNumber: number;
    data: {
        type: 'freelancer' | 'agency' | 'both';
        service: string;
        skills: string[];
        industry?: string;
        location: string;
        mustHaveOffice?: boolean;
        languages: string[];
        companyName: string;
        companySize: string;
        jobPosition: string;
        isMonthlyFee: boolean;
        budget: string;
        description: string;
        infoAttachment?: string;

        user: {
            fname: string;
            lname: string;
            email: string;
            isAgree: boolean;
            phone: string;
        };
    };
}

const initialState: IProjectPostState = {
    isPopupOpen: false,
    stepNumber: 1,
    data: {
        type: 'freelancer',
        service: "",
        skills: [],
        industry: "",
        location: "",
        mustHaveOffice: false,
        languages: [],
        companyName: "",
        companySize: "",
        jobPosition: "",
        isMonthlyFee: false,
        budget: "",
        description: "",
        infoAttachment: '',
        user: {
            fname: '',
            lname: '',
            email: '',
            isAgree: false,
            phone: '',
        }
    },
};

export const projectPostSlice = createSlice({
    name: "projectPost",
    initialState,
    reducers: {
        setPopupState: (state, action: PayloadAction<boolean>) => {
            state.isPopupOpen = action.payload;

            // if (state.isPopupOpen) {
            //     state.data = initialState.data;
            //     state.stepNumber = 1;
            // }
        },
        setStepNumber: (state, action: PayloadAction<number>) => {
            state.stepNumber = action.payload;
        },
        updateData: <K extends keyof IProjectPostState["data"]>(
            state: IProjectPostState,
            action: PayloadAction<{ key: K; value: IProjectPostState["data"][K] }>
        ) => {
            const { key, value } = action.payload;
            state.data[key] = value;
        },
        updateSkills: (
            state,
            action: PayloadAction<string[]>
        ) => {
            state.data.skills = action.payload;
        },
        clearState: () => initialState,
    },
});

export const { setPopupState, setStepNumber, updateData, updateSkills, clearState } = projectPostSlice.actions;
export const projectPostReducer = projectPostSlice.reducer;
