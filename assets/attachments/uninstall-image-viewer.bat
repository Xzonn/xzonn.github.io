@echo off

echo ==========================================
echo ������̡����ܿ�ͼ������ж�ؽű�
echo ==========================================
echo.
echo �˽ű���ɾ�������������ġ����ܿ�ͼ�����
echo ��ȷ���Թ���Ա������д˽ű�
echo.
pause

echo ����ɾ��ע�����...
echo.

:: ɾ��ע�����1��HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociations
echo [1/3] ɾ�� HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociations
reg delete "HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociations" /f >nul 2>&1
if %errorlevel% equ 0 (
    echo     ? ɾ���ɹ�
) else (
    echo     ? ɾ��ʧ�ܻ���Ŀ������
)

:: ɾ��ע�����2��HKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewer
echo [2/3] ɾ�� HKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewer
reg delete "HKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewer" /f >nul 2>&1
if %errorlevel% equ 0 (
    echo     ? ɾ���ɹ�
) else (
    echo     ? ɾ��ʧ�ܻ���Ŀ������
)

:: ɾ��ע�����3��HKEY_CURRENT_USER\Software\RegisteredApplications\BaiduNetdiskImageViewer
echo [3/3] ɾ�� HKEY_CURRENT_USER\Software\RegisteredApplications �е� BaiduNetdiskImageViewer
reg delete "HKEY_CURRENT_USER\Software\RegisteredApplications" /v "BaiduNetdiskImageViewer" /f >nul 2>&1
if %errorlevel% equ 0 (
    echo     ? ɾ���ɹ�
) else (
    echo     ? ɾ��ʧ�ܻ���Ŀ������
)

echo.
echo ����ɾ�������ļ�...

:: ɾ������Ŀ¼
set "imageviewer_path=%APPDATA%\baidu\BaiduNetdisk\module\ImageViewer"
if exist "%imageviewer_path%" (
    echo �ҵ�����Ŀ¼: %imageviewer_path%
    echo ����ɾ�������ļ�...
    rmdir /s /q "%imageviewer_path%" >nul 2>&1
    if %errorlevel% equ 0 (
        echo     ? �����ļ�ɾ���ɹ�
    ) else (
        echo     ? �����ļ�ɾ��ʧ�ܣ������ļ�����ʹ����
        echo     ���ֶ�ɾ��: %imageviewer_path%
    )
) else (
    echo     ����Ŀ¼�����ڻ��ѱ�ɾ��
)

echo.
echo ==========================================
echo ж����ɣ�
echo ==========================================
echo.
echo ���������������ȷ�����и�����Ч
echo ���������Ȼ���ڣ�
echo ��������·���Ƿ��в����ļ���
echo %APPDATA%\baidu\BaiduNetdisk\module\ImageViewer
echo.
echo ��������˳�...
pause >nul
