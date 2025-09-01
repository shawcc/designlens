/**
 * 文件上传组件
 * 支持拖拽上传和点击上传，处理文件验证和上传状态
 */
import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, FileText, AlertCircle } from 'lucide-react';
import { useAtom } from 'jotai';
import { uploadStatusAtom } from '../../stores/globalState';
import { useUploadHandler } from './uploadHandler';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect }) => {
  const [uploadStatus] = useAtom(uploadStatusAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleDrop, handleDragOver, handleDragEnter, handleDragLeave } = useUploadHandler(onFileSelect);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const isUploading = uploadStatus === 'uploading' || uploadStatus === 'analyzing';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100
          ${isUploading 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
          }
        `}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: isUploading ? 1 : 1.02 }}
        whileTap={{ scale: isUploading ? 1 : 0.98 }}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <motion.div
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-lg font-medium text-slate-700">
                {uploadStatus === 'uploading' ? '上传中...' : 'AI分析中...'}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                {uploadStatus === 'analyzing' ? '正在进行多维度设计诊断' : '请稍候'}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <motion.div
            className="flex justify-center"
            animate={{ y: isUploading ? -10 : 0 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Upload className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              上传你的设计作品
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              支持拖拽上传或点击选择文件
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <Image className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-sm text-slate-600">PNG/JPG</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <FileText className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-sm text-slate-600">PDF</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <AlertCircle className="w-8 h-8 text-orange-500 mb-2" />
              <span className="text-sm text-slate-600">最大10MB</span>
            </div>
          </div>

          <div className="text-sm text-slate-500">
            <p>支持网页截图、UI设计稿、海报、logo等各类设计作品</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      </motion.div>

      {uploadStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">上传失败，请检查文件格式和大小</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
