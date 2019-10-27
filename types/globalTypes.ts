/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CustomerInput {
  name: string;
  subDomain?: string | null;
}

export interface EnvironmentVariableInput {
  id?: string | null;
  name: string;
  value: string;
}

export interface EnvironmentVariableNameInput {
  id?: string | null;
  name: string;
}

export interface ProductInput {
  name: string;
  environmentVariableNames: EnvironmentVariableNameInput[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
