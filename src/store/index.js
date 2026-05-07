import {create} from "zustand";


export const useStore = create((set) => ({
	sizeInfo: {
		width: 3,
		height: 1
	},
	changeSize:  (info) => set({
		sizeInfo: info
	})
}));

