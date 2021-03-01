import axios from "axios";

export function createMockUserAndList() {
  return new Promise((resolve) => {
    axios
      .post("https://x8ki-letl-twmt.n7.xano.io/api:R7Ak7I0A/user")
      .then(({ data: user }) => {
        createProject({
          user_id: user.id,
          title: "My First Project",
        }).then(({ data: project }) => {
          createList({
            user_id: user.id,
            project_id: project.id,
            title: "My First List",
          }).then(({ data: list }) => {
            createListItem({
              title: "Click to edit!",
              list_id: list.id
            }).then(({ data: item }) => {
              resolve({ ...list, items: [item.id] });
            });
          });
        });
      });
  });
}

export function createProject() {
  return axios.post("https://x8ki-letl-twmt.n7.xano.io/api:R7Ak7I0A/project");
}

export function getUserLists(userId) {
  return axios.get(
    `https://x8ki-letl-twmt.n7.xano.io/api:R7Ak7I0A/user/${userId}/lists`
  );
}

export function createList(list) {
  return axios.post("https://x8ki-letl-twmt.n7.xano.io/api:R7Ak7I0A/list", {
    ...list
  });
}

export function createListItem(newItem) {
  return axios.post("https://x8ki-letl-twmt.n7.xano.io/api:R7Ak7I0A/listitem", {
    ...newItem
  });
}

export function getListItems(listId) {
  return axios.get(
    `https://x8ki-letl-twmt.n7.xano.io/api:R7Ak7I0A/list/${listId}/listitems`
  );
}
