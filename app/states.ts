import { atom, selector } from "recoil";
//textName

export const textName = atom({
  key: "textName",
  default: null,
});

//posts

export const postslist = atom({
  key: "postList",
  default: [],
});

export const selectedPost = atom({
  key: "selectedPost",
  default: {
    id: null,
    start: null,
    end: null,
  },
});

//filter related states
export const openFilterState = atom({
  key: "openFilter", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const showLatest = atom({
  key: "latestFilter",
  default: true,
});
export const filterDataState = atom({
  key: "filterData",
  default: {
    type: "all",
    date: { startDate: null, endDate: null },
    user: [],
    solved: "both",
  },
});

export const filteredPost = selector({
  key: "FilteredPost",
  get: ({ get }) => {
    const filter = get(filterDataState);
    let posts = [...get(postslist)];
    const isLatest = get(showLatest);

    if (filter.type && filter.type !== "all")
      posts = posts.filter((l) => {
        return l.type === filter.type;
      });
    if (filter.user?.length)
      posts = posts.filter((l) => {
        return filter.user?.includes(l.creatorUser.username);
      });
    if (filter.date?.startDate)
      posts = posts.filter((l) => {
        return (
          new Date(l.created_at).getTime() >
            new Date(filter.date.startDate).getTime() &&
          new Date(l.created_at).getTime() <
            new Date(filter.date.endDate).getTime()
        );
      });
    if (filter.solved && filter.solved !== "both")
      posts = posts.filter((l) => {
        return l.isSolved === (filter.solved === "solved");
      });
    if (posts.length > 0) {
      // posts = posts.sort((a, b) => {
      //   if (isLatest) return new Date(b.created_at) - new Date(a.created_at);
      //   else return new Date(a.created_at) - new Date(b.created_at);
      // });
      posts.sort(function (a, b) {
        let c: number = new Date(a.created_at);
        let d: number = new Date(b.created_at);
        return !isLatest ? c - d : d - c;
      });
    }
    return posts;
  },
});
//text selection
export const selectionRangeState = atom({
  key: "textSelectOnEditor",
  default: {
    type: "",
    start: 0,
    end: 0,
    content: "",
  },
});

export const selectedTextOnEditor = atom({
  key: "selectedTextOnEditor",
  default: {
    start: 0,
    end: 0,
    text: "",
  },
});