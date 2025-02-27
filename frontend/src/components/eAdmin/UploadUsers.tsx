import React, { useState } from "react";
import { Button, Flex, Typography, Upload, message } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { useParseUser } from "hooks/eadmin-hooks/useParseUser";


const UploadUsers = () => {
  const [file, setFile] = useState<UploadFile>();
  const [uploading, setUploading] = useState(false);
  const parseFile = useParseUser();

  const props: UploadProps = {
    multiple: false,
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: (file) => {
      if (file.type === "text/csv") {
        setFile(file);
        return false;
      }
      message.error(`${file.name} is not a csv file`);
      return false;
    },
  };

  const handleUpload = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("CSVfile", file as RcFile);
    parseFile.mutate(formData, {
      onSuccess: () => {
        setUploading(false);
        setFile(undefined);
      },
      onError: () => {
        setUploading(false);
      },
    });
  };

  return (
    <div className="containerShadow" style={{ padding: "20px" }}>
      <Typography>
        <Typography.Title level={3} style={{ marginTop: "0px" }}>
          Dodavanje korisnika u aplikaciju
        </Typography.Title>
        <Typography.Paragraph>
          Dodavanje korisnika u aplikaciju vrši se putem .csv datoteke. Uplodaj
          tim po tim jer će ti inaće timeoutat konekcija i neće se unest svi
          korisnici.
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>
            Unutar csv neka podaci budu odvojeni zarezom (,) i da su samo podaci
            nemoj exportat nazive stupca!
            <br />
            Kreiraj akademsku godinu kroz django admin panel prije nego što
            uplodaš csv!
          </strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>
            Ukoliko se desi neka greška izbacit će ti u consoli. A za detalje
            ćeš trebat pogledat docker kontenjer na serveru.
          </strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          Template možeš pronaći u IT disku pod{" "}
          <Typography.Link
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/15fjBPcMTJh64l9DMy08piZHmCCrdKLUT8G0pyxMtMeA/edit?usp=drive_link"
          >
            templates
          </Typography.Link>
          !
        </Typography.Paragraph>
        <Typography.Paragraph>
          Kopiraj tim po tim u novu karticu i exportas tu karticu u .csv
        </Typography.Paragraph>
      </Typography>
      <Flex justify="center" align="center" gap={"middle"}>
        <Upload maxCount={1} {...props}>
          <Button icon={<UploadOutlined />}>Prenesi .csv file</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={file === undefined}
          loading={uploading}
        >
          Unesi
        </Button>
      </Flex>
    </div>
  );
};

export default UploadUsers;
