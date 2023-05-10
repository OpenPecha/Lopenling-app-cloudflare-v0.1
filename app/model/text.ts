// find text by textId

import { db } from "~/db.server";
import { fullSearch } from "~/lib/fullsearch";

// get all text

export async function findAllText(id = true, name = true, content = false) {
  try {
    let text = await db.text.findMany({
      select: {
        id,
        name,
        content,
        userId: true,
      },
    });
    return text;
  } catch (e) {
    throw new Error("fetching text error" + e.message);
  }
}
export async function searchTextWithName(
  search_term = "",
  id = true,
  name = true,
  content = true
) {
  try {
    const textList = await db.text.findMany({
      where: {
        name: {
          contains: search_term,
          mode: "insensitive",
        },

        content: {
          contains: search_term,
          mode: "insensitive",
        },
      },
      select: {
        content,
        id,
        name,
      },
    });
    return fullSearch(textList, search_term);
  } catch (e) {
    throw new Error("error finding text with name" + e.message);
  }
}
// find text by textId
export async function findTextByTextId(id: number, content: boolean = false) {
  try {
    const text = await db.text.findUnique({
      where: {
        id,
      },
      select: {
        content,
        id: true,
        name: true,
        userId: true,
      },
    });
    return text;
  } catch (e) {
    return "cannot find text with error " + e.message;
  }
}

//create text
export async function createText(name: string, content: string, id: string) {
  try {
    let res = await db.text.create({
      data: {
        name,
        content,
        userId: id,
      },
    });
    return res;
  } catch (e) {
    throw new Error("create text error" + e.message);
  }
}
//delete text
export async function deleteText(id: string) {
  try {
    let res = db.text.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res;
  } catch (e) {
    throw new Error("delete text error" + e.message);
  }
}

//update text
export async function updateText(id: number, content: string) {
  try {
    let res = db.text.update({
      data: {
        content,
      },
      where: {
        id,
      },
    });
    return res;
  } catch (e) {
    throw new Error("update text error" + e.message);
  }
}
