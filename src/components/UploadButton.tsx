import React from "react";
import ui from '../utils/ui';
import UploadPhoto from './UploadPhoto';

import './UploadButton.scss';

const UploadButton = () => (
  <button
    className="UploadButton"
    onClick={() => ui.showModal({
      header: '사진 업로드',
      content: <UploadPhoto />
    })}
  >
    사진 업로드
  </button>
)

export default UploadButton