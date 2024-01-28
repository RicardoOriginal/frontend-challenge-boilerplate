import { createContext, useContext, useReducer } from "react";

import { FileActionType } from "@/constants";
import {
  FileAction,
  FileContextState,
  FileDispatch,
  FileProviderProps,
} from "@/types";
import axiosInstance from "@/api";

export const FileContextInitialValues: Partial<FileContextState> = {
  file: {} as File,
  isLoading: false,
};

const FileContext = createContext<{
  state: FileContextState;
  dispatch: FileDispatch;
}>({
  state: FileContextInitialValues as FileContextState,
  dispatch: () => {},
});

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.SET_UPLOAD_FILE: {
      console.log("PASSOU AQUI SET_UPLOAD_FILE");
      break;
    }
    case FileActionType.SET_FILE_LIST: {
      console.log("PASSOU AQUI SET_FILE_LIST");
      break;
    }
    case FileActionType.SET_IS_LOADING: {
      console.log("PASSOU AQUI SET_IS_LOADING");
      break;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);
  
   axiosInstance.get("/process-file")
  .then(response => {
    console.log('Dados recebidos:', response.data);
    context.state.fileListInfo = response.data;
  })
  .catch(error => {
    console.error('Erro ao obter dados:', error);
  });

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};

export { FileProvider, useFileContext };
