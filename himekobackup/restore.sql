--
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE himekolovers;
--
-- Name: himekolovers; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE himekolovers WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'es_VE.UTF-8';


ALTER DATABASE himekolovers OWNER TO postgres;

\connect himekolovers

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Inventories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Inventories" (
    "SID" integer NOT NULL,
    "MID" integer NOT NULL,
    "IID" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Inventories" OWNER TO postgres;

--
-- Name: Inventories_IID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Inventories_IID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Inventories_IID_seq" OWNER TO postgres;

--
-- Name: Inventories_IID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Inventories_IID_seq" OWNED BY public."Inventories"."IID";


--
-- Name: Laboratories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Laboratories" (
    "LID" integer NOT NULL,
    "RIF" character varying(15) NOT NULL,
    name character varying(50) NOT NULL,
    address character varying(200) NOT NULL,
    phone character varying(15) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status boolean
);


ALTER TABLE public."Laboratories" OWNER TO postgres;

--
-- Name: Laboratories_LID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Laboratories_LID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Laboratories_LID_seq" OWNER TO postgres;

--
-- Name: Laboratories_LID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Laboratories_LID_seq" OWNED BY public."Laboratories"."LID";


--
-- Name: Medicines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Medicines" (
    "MID" integer NOT NULL,
    "LID" integer NOT NULL,
    code character varying(15) NOT NULL,
    name character varying(50) NOT NULL,
    "desc" character varying(100) NOT NULL,
    presentation character varying(100) NOT NULL,
    status boolean
);


ALTER TABLE public."Medicines" OWNER TO postgres;

--
-- Name: Medicines_MID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Medicines_MID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Medicines_MID_seq" OWNER TO postgres;

--
-- Name: Medicines_MID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Medicines_MID_seq" OWNED BY public."Medicines"."MID";


--
-- Name: Offices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Offices" (
    "SID" integer NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(40) NOT NULL,
    status boolean
);


ALTER TABLE public."Offices" OWNER TO postgres;

--
-- Name: Offices_SID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Offices_SID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Offices_SID_seq" OWNER TO postgres;

--
-- Name: Offices_SID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Offices_SID_seq" OWNED BY public."Offices"."SID";


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "UID" integer NOT NULL,
    "SID" integer NOT NULL,
    identification character varying(20) NOT NULL,
    name character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    mail character varying(100) NOT NULL,
    phone character varying(15) NOT NULL,
    type integer NOT NULL,
    password character varying(100) NOT NULL,
    status boolean
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_UID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_UID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_UID_seq" OWNER TO postgres;

--
-- Name: Users_UID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_UID_seq" OWNED BY public."Users"."UID";


--
-- Name: Inventories IID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventories" ALTER COLUMN "IID" SET DEFAULT nextval('public."Inventories_IID_seq"'::regclass);


--
-- Name: Laboratories LID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Laboratories" ALTER COLUMN "LID" SET DEFAULT nextval('public."Laboratories_LID_seq"'::regclass);


--
-- Name: Medicines MID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicines" ALTER COLUMN "MID" SET DEFAULT nextval('public."Medicines_MID_seq"'::regclass);


--
-- Name: Offices SID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offices" ALTER COLUMN "SID" SET DEFAULT nextval('public."Offices_SID_seq"'::regclass);


--
-- Name: Users UID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "UID" SET DEFAULT nextval('public."Users_UID_seq"'::regclass);


--
-- Data for Name: Inventories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Inventories" ("SID", "MID", "IID", quantity, "createdAt") FROM stdin;
\.
COPY public."Inventories" ("SID", "MID", "IID", quantity, "createdAt") FROM '$$PATH$$/4361.dat';

--
-- Data for Name: Laboratories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Laboratories" ("LID", "RIF", name, address, phone, "createdAt", status) FROM stdin;
\.
COPY public."Laboratories" ("LID", "RIF", name, address, phone, "createdAt", status) FROM '$$PATH$$/4363.dat';

--
-- Data for Name: Medicines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Medicines" ("MID", "LID", code, name, "desc", presentation, status) FROM stdin;
\.
COPY public."Medicines" ("MID", "LID", code, name, "desc", presentation, status) FROM '$$PATH$$/4359.dat';

--
-- Data for Name: Offices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Offices" ("SID", code, name, status) FROM stdin;
\.
COPY public."Offices" ("SID", code, name, status) FROM '$$PATH$$/4357.dat';

--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("UID", "SID", identification, name, "lastName", mail, phone, type, password, status) FROM stdin;
\.
COPY public."Users" ("UID", "SID", identification, name, "lastName", mail, phone, type, password, status) FROM '$$PATH$$/4355.dat';

--
-- Name: Inventories_IID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Inventories_IID_seq"', 1, false);


--
-- Name: Laboratories_LID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Laboratories_LID_seq"', 1, false);


--
-- Name: Medicines_MID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Medicines_MID_seq"', 1, false);


--
-- Name: Offices_SID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Offices_SID_seq"', 1, false);


--
-- Name: Users_UID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_UID_seq"', 1, false);


--
-- Name: Inventories Inventories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inventories"
    ADD CONSTRAINT "Inventories_pkey" PRIMARY KEY ("IID");


--
-- Name: Laboratories Laboratories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Laboratories"
    ADD CONSTRAINT "Laboratories_pkey" PRIMARY KEY ("LID");


--
-- Name: Medicines Medicines_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicines"
    ADD CONSTRAINT "Medicines_code_key" UNIQUE (code);


--
-- Name: Medicines Medicines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicines"
    ADD CONSTRAINT "Medicines_pkey" PRIMARY KEY ("MID");


--
-- Name: Offices Offices_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offices"
    ADD CONSTRAINT "Offices_code_key" UNIQUE (code);


--
-- Name: Offices Offices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offices"
    ADD CONSTRAINT "Offices_pkey" PRIMARY KEY ("SID");


--
-- Name: Users Users_identification_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_identification_key" UNIQUE (identification);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("UID");


--
-- PostgreSQL database dump complete
--

