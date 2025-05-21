// LocalStorage dəstəyi ilə məlumatları oxu
let data = JSON.parse(localStorage.getItem("cvData")) || {
  profile: {
    name: "Richard Sanchez",
    title: "Marketing Manager",
    description: "Experienced in digital strategy, branding, and team leadership."
  },
  contact: {
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City",
    website: "www.reallygreatsite.com"
  },
  education: [
    { year: "2029 - 2030", school: "WARDIERE UNIVERSITY", degree: "Master of Business Management" }
  ],
  skills: ["Teamwork", "Leadership"],
  experience: [
    {
      company: "Borcelle Studio",
      period: "2030 - PRESENT",
      role: "Marketing Manager",
      details: ["Lead team", "Manage campaigns"]
    }
  ]
};

// === Render funksiyası ===

function renderData() {
  const app = document.getElementById("app");
  saveData(); // localStorage-a yaz

  app.innerHTML = `
    <div class="container">
      <div class="sidebar">
        <h2>Əlaqə</h2>
        ${renderContact()}
        <h2>Təhsil</h2>
        <div id="education-section">${renderEducation()}</div>
        <button onclick="addEducation()">+ Yeni Təhsil</button>

        <h2>Bacarıqlar</h2>
        <ul id="skills-list">${renderSkills()}</ul>
        <input type="text" id="new-skill" placeholder="Yeni bacarıq">
        <button onclick="addSkill()">+ Əlavə et</button>
      </div>

      <div class="content">
        <h1><input value="${data.profile.name}" onchange="updateField('profile', 'name', this.value)" /></h1>
        <h3><input value="${data.profile.title}" onchange="updateField('profile', 'title', this.value)" /></h3>
        <p><textarea onchange="updateField('profile', 'description', this.value)">${data.profile.description}</textarea></p>

        <h2>İş Təcrübəsi</h2>
        <div id="experience-section">${renderExperience()}</div>
        <button onclick="addExperience()">+ Yeni Təcrübə</button>
      </div>
    </div>
  `;
}

// === Render helper funksiyaları ===

function renderContact() {
  return Object.keys(data.contact).map(key =>
    `<p><input value="${data.contact[key]}" onchange="updateField('contact', '${key}', this.value)" /></p>`
  ).join('');
}

function renderEducation() {
  return data.education.map((edu, index) => `
    <div>
      <input value="${edu.year}" onchange="updateEducation(${index}, 'year', this.value)" />
      <input value="${edu.school}" onchange="updateEducation(${index}, 'school', this.value)" />
      <input value="${edu.degree}" onchange="updateEducation(${index}, 'degree', this.value)" />
      <button onclick="deleteEducation(${index})">🗑️</button>
    </div>
  `).join('');
}

function renderSkills() {
  return data.skills.map((skill, index) => `
    <li>
      <input value="${skill}" onchange="updateSkill(${index}, this.value)" />
      <button onclick="deleteSkill(${index})">🗑️</button>
    </li>
  `).join('');
}

function renderExperience() {
  return data.experience.map((exp, index) => `
    <div class="job">
      <input value="${exp.company}" onchange="updateExperience(${index}, 'company', this.value)" />
      <input value="${exp.period}" onchange="updateExperience(${index}, 'period', this.value)" />
      <input value="${exp.role}" onchange="updateExperience(${index}, 'role', this.value)" />
      <ul>
        ${exp.details.map((detail, i) => `
          <li>
            <input value="${detail}" onchange="updateExperienceDetail(${index}, ${i}, this.value)" />
            <button onclick="deleteExperienceDetail(${index}, ${i})">🗑️</button>
          </li>
        `).join('')}
      </ul>
      <button onclick="addExperienceDetail(${index})">+ Yeni Detal</button>
      <button onclick="deleteExperience(${index})">🗑️ Təcrübəni Sil</button>
    </div>
  `).join('');
}

// === Redaktə funksiyaları ===

function updateField(section, field, value) {
  data[section][field] = value;
  renderData();
}

function updateEducation(index, field, value) {
  data.education[index][field] = value;
  renderData();
}

function updateSkill(index, value) {
  data.skills[index] = value;
  renderData();
}

function updateExperience(index, field, value) {
  data.experience[index][field] = value;
  renderData();
}

function updateExperienceDetail(expIndex, detailIndex, value) {
  data.experience[expIndex].details[detailIndex] = value;
  renderData();
}

// === Yeni sahə əlavə edən funksiyalar ===

function addEducation() {
  data.education.push({ year: "", school: "", degree: "" });
  renderData();
}

function addSkill() {
  const input = document.getElementById("new-skill");
  if (input.value.trim()) {
    data.skills.push(input.value.trim());
    input.value = "";
    renderData();
  }
}

function addExperience() {
  data.experience.push({
    company: "Yeni Şirkət",
    period: "YYYY - YYYY",
    role: "Yeni vəzifə",
    details: ["Yeni məsuliyyət"]
  });
  renderData();
}

function addExperienceDetail(index) {
  data.experience[index].details.push("Yeni detal");
  renderData();
}

// === Silmə funksiyaları ===

function deleteEducation(index) {
  data.education.splice(index, 1);
  renderData();
}

function deleteSkill(index) {
  data.skills.splice(index, 1);
  renderData();
}

function deleteExperience(index) {
  data.experience.splice(index, 1);
  renderData();
}

function deleteExperienceDetail(expIndex, detailIndex) {
  data.experience[expIndex].details.splice(detailIndex, 1);
  renderData();
}

// === LocalStorage yadda saxla ===

function saveData() {
  localStorage.setItem("cvData", JSON.stringify(data));
}

// === Başlanğıc yükləmə ===

document.addEventListener("DOMContentLoaded", renderData);
