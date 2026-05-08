import {create} from "zustand";

export const initialData={
	'SS1-T1211': [4,3],
	'SS1-T1242': [5,4],
}


export const useStore=create((set) => ({
	sizeInfo: initialData,
	changeSize: (info) => set({
		sizeInfo: info
	})
}));


export const taskStore=create((set) => ({
	taskInfo: 'SS1-T1211',
	setTaskInfo: (task) => set({
		taskInfo: task
	})
}));
