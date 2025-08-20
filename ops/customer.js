import { customerAPI } from "../services";

export async function addCustomer(data) {
  return customerAPI.addCustomer(data);
}

export async function updateCustomer(id, data) {
  return customerAPI.editCustomer(id, data);
}
