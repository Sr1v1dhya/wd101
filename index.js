const email = document.getElementById("email");
email.addEventListener("input", () => Validate(email));

function Validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("Enter email in the correct format");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const form = document.getElementById("form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userenteries = retrieveEntries();

const display = () => {
  const entries = retrieveEntries();
  const tableentries = entries
    .map((entry) => {
      const namecell = `<td class = "ta">${entry.name}</td>`;
      const emailcell = `<td class = "ta">${entry.email}</td>`;
      const passcell = `<td class = "ta">${entry.password}</td>`;
      const dobcell = `<td class = "ta">${entry.dob}</td>`;
      const termscell = `<td class = "ta">${entry.acceptTerms}</td>`;

      const row = `<tr>
          ${namecell} ${emailcell} ${passcell} ${dobcell} ${termscell}
        </tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-fit m-4">
      <tr>
        <th class = "ta">Name</th>
        <th class = "ta">Email</th>
        <th class = "ta">Password</th>
        <th class = "ta">DOB</th>
        <th class = "ta">Accepted Terms?</th>
      </tr>
      ${tableentries}
    </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveentries = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };

  userenteries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userenteries));

  form.reset();
  display();
};

form.addEventListener("submit", saveentries);
display();

const dateob = document.getElementById("dob");

const checkdob = (element) => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let maxyear = year - 18;
  let minyear = year - 55;

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let maxDate = `${maxyear}-${month}-${day}`;
  let minDate = `${minyear}-${month}-${day}`;

  let dobValue = element.value;

  if (dobValue) {
    if (dobValue > maxDate || dobValue < minDate) {
      element.setCustomValidity(
        "Date of birth must be between " + minDate + " and " + maxDate + "."
      );
    } else {
      element.setCustomValidity("");
    }
  } else {
    element.setCustomValidity("");
  }

  element.reportValidity();
  element.setAttribute("max", maxDate);
  element.setAttribute("min", minDate);
};

dateob.addEventListener("input", () => checkdob(dateob));

const formdob = document.querySelector("form");
if (formdob) {
  formdob.addEventListener("submit", (event) => {
    if (!dateob.checkValidity()) {
      event.preventDefault();
      dateob.reportValidity();
    }
  });
}
