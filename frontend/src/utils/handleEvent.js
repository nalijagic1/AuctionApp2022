export function handleDrag(e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    return true;
  } else if (e.type === "dragleave") {
    return false;
  }
}

export function handleDrop(e, array) {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    return array.concat(e.dataTransfer.files[0]);
  }
}

export function updateErrorMessage(data, errorField) {
  var error = { ...data };
  error[errorField] = "";
  return error;
}
