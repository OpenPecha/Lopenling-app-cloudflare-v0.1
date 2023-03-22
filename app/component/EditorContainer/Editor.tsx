import { useLoaderData } from "@remix-run/react";
import { BubbleMenu, EditorContent } from "@tiptap/react";
import { useState } from "react";
import copyIcon from "~/assets/svg/icon_copy.svg";
import searchIcon from "~/assets/svg/icon_search.svg";
import { useRecoilState, useSetRecoilState } from "recoil";
import EditorSettings from "./EditorSettings";
import { Button, Spinner } from "flowbite-react";
import { DEFAULT_FONT_SIZE } from "~/constants";
import uselitteraTranlation from "~/locales/useLitteraTranslations";
import { selectedTextOnEditor, selectionRangeState } from "~/states";
import floatingSortIcon from "~/assets/svg/icon_floatingSortIcon.svg";

function Editor({ content, editor }) {
  const data = useLoaderData();
  const [showEditorSettings, setShowEditorSettings] = useState(false);
  const [showFindText, setShowFindText] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const setSelectionRange = useSetRecoilState(selectionRangeState);
  const [selection] = useRecoilState(selectedTextOnEditor);

  const handleBubbleClick = (type: string) => {
    if (selection.start)
      setSelectionRange({
        type: type,
        start: selection.start,
        end: selection.end,
        content: selection.text,
      });
  };
  const translation = uselitteraTranlation();
  return (
    <div className="relative flex-1 textEditorContainer">
      <EditorSettings
        editor={editor}
        showFindText={showFindText}
        showFontSize={showFontSize}
        setShowFindText={setShowFindText}
        setShowFontSize={setShowFontSize}
      />
      <h1 className=" my-4 text-center  flex items-center justify-center  text-3xl  text-gray-900">
        {data?.text?.name}
      </h1>
      <div className=" max-h-80 overflow-y-scroll lg:max-h-full shadow-textEditor">
        {!content || !editor ? (
          <div className="flex justify-center">
            <Spinner color="#111" />
          </div>
        ) : (
          <EditorContent
            editor={editor}
            className="editor"
            style={{
              fontSize: DEFAULT_FONT_SIZE,
            }}
          />
        )}
      </div>
      {editor && (
        <BubbleMenu
          shouldShow={(editor) => {
            let length = editor.state.selection.content().size;
            return length > 5 && length < 244;
          }}
          editor={editor}
          tippyOptions={{ duration: 800, zIndex: 1 }}
        >
          <Button.Group className="rounded ">
            <Button
              size="sm"
              color=""
              className=" bg-white text-green-400 hover:bg-green-200 hover:text-green-500  border-gray-300 border-2"
              onClick={() => handleBubbleClick("comment")}
            >
              {translation.comment}
            </Button>
            <Button
              size="sm"
              color=""
              className="bg-white text-green-400 hover:bg-green-200 hover:text-green-500 border-gray-300 border-2"
              onClick={() => handleBubbleClick("question")}
            >
              {translation.question}
            </Button>
          </Button.Group>
        </BubbleMenu>
      )}
      <div
        className="absolute bottom-2 right-3 z-40 md:hidden"
        onClick={() => setShowEditorSettings((prev) => !prev)}
      >
        {showEditorSettings && (
          <div className="bg-white shadow rounded-md absolute bottom-full right-0 w-max p-2">
            <button
              className="bg-white text-gray-700 flex justify-between items-center gap-2 p-1"
              onClick={() => setShowFindText(true)}
            >
              <img src={searchIcon} alt="search" height={16} width={16} />
              {translation.search}
            </button>
            <button
              className="bg-white text-gray-700 flex justify-between items-center gap-2 p-1"
              onClick={() => setShowFontSize(true)}
            >
              <img src={copyIcon} alt="copy" height={16} width={16} />
              {translation.fontSize}
            </button>
          </div>
        )}

        <img src={floatingSortIcon} alt="floatingSortIcon" />
      </div>
    </div>
  );
}

export default Editor;
