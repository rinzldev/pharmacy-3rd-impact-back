-- Insert Users

INSERT INTO public."Users"(
	"UID", "SID", identification, name, "lastName", mail, phone, type, password, status)
	VALUES (1, 1, 26238049, 'Oswaldo', 'Yanez', 'Oz@gmail.com', '555', 0, '1234', true);

INSERT INTO public."Users"(
	"UID", "SID", identification, name, "lastName", mail, phone, type, password, status)
	VALUES (2, 1, 2555555, 'Jesus', 'Manzano', 'yisus@gmail.com', '555', 0, '1234', true);

INSERT INTO public."Users"(
	"UID", "SID", identification, name, "lastName", mail, phone, type, password, status)
	VALUES (3, 5, 555555, 'tavo', 'god', 'test@gmail.com', '555', 0, '1234', true);

INSERT INTO public."Users"(
	"UID", "SID", identification, name, "lastName", mail, phone, type, password, status)
	VALUES (4, 2, 5655, 'wilbur', 'nogod', 'test2@gmail.com', '555', 1, '1234', true);

INSERT INTO public."Users"(
	"UID", "SID", identification, name, "lastName", mail, phone, type, password, status)
	VALUES (5, 4, 56665, 'Dan', 'punpun', 'test3@gmail.com', '555', 1, '1234', true);

INSERT INTO public."Users"(
	"UID", "SID", identification, name, "lastName", mail, phone, type, password, status)
	VALUES (6, 3, 45458, 'Simon', 'Honkai', 'test4@gmail.com', '555', 0, '1234', true);



-- Insert Offices

INSERT INTO public."Offices"(
	"SID", code, name, status)
	VALUES (1, 'k25', 'Tachira', true);
INSERT INTO public."Offices"(
	"SID", code, name, status)
	VALUES (2, 'k45', 'Lara', true);

INSERT INTO public."Offices"(
	"SID", code, name, status)
	VALUES (3, 'kmx45', 'Mexico', true);

INSERT INTO public."Offices"(
	"SID", code, name, status)
	VALUES (4, 'k43', 'Cabudare', true);

INSERT INTO public."Offices"(
	"SID", code, name, status)
	VALUES (5, 'k456', 'Apure', true);

-- Insert Laboratories	

INSERT INTO public."Laboratories"(
	"LID", "RIF", name, address, phone, "createdAt", status)
	VALUES (1, '555555', 'cli', 'leones', '5555', '10-01-2023', true);

INSERT INTO public."Laboratories"(
	"LID", "RIF", name, address, phone, "createdAt", status)
	VALUES (2, '56542', 'cli', 'leones', '5555', '10-01-2023', true);

INSERT INTO public."Laboratories"(
	"LID", "RIF", name, address, phone, "createdAt", status)
	VALUES (3, '54642', 'cli', 'leones', '5555', '10-01-2023', true);

INSERT INTO public."Laboratories"(
	"LID", "RIF", name, address, phone, "createdAt", status)
	VALUES (4, '56462', 'cli', 'leones', '5555', '10-01-2023', true);

INSERT INTO public."Laboratories"(
	"LID", "RIF", name, address, phone, "createdAt", status)
	VALUES (5, '56472', 'cli', 'leones', '5555', '10-01-2023', true);

-- Insert Medicines

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (1, 1, 'k231', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (2, 1, 'k304', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (3, 1, 'k2313', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (4, 2, 'k23112', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (5, 2, 'a231', 'viagra', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (6, 3, 'b231', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (7, 3, 'c231', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (8, 3, 'd231', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (9, 3, 'g231', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (10, 5, 'ff231', 'Tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (11, 5, 'tt304', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (12, 5, 'gg231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (13, 5, 'f5231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (14, 1, 'fr231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (15, 2, 'k4f231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (16, 4, 'k443231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (17, 4, 'kn4231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (18, 3, 'k343231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (19, 2, 'k5g231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (20, 1, 'kret4231', 'tachipirin', 'test', 'test', true);

INSERT INTO public."Medicines"(
	"MID", "LID", code, name, "desc", presentation, status)
	VALUES (21, 4, 'k23541', 'tachipirin', 'test', 'test', true);

-- Insert Inventories 

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (1, 1, 1, 250, '10-01-2023');
	
INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (1, 5, 2, 35, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (2, 4, 3, 550, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (3, 12, 4, 350, '10-01-2023');
	
INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (2, 11, 5, 45, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (2, 4, 6, 50, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (5, 13, 7, 150, '10-01-2023');
	
INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (5, 14, 8, 35, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (3, 20, 9, 550, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (3, 21, 10, 250, '10-01-2023');
	
INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (6, 5, 11, 35, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (4, 6, 12, 550, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (3, 4, 13, 250, '10-01-2023');
	
INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (1, 6, 14, 35, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (2, 19, 15, 550, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (2, 18, 16, 250, '10-01-2023');
	
INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (4, 4, 17, 35, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (3, 6, 18, 550, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (3, 18, 19, 250, '10-01-2023');
	
INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (3, 4, 20, 35, '10-01-2023');

INSERT INTO public."Inventories"(
	"SID", "MID", "IID", quantity, "createdAt")
	VALUES (4, 6, 21, 550, '10-01-2023');

