import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  date: Yup.date().required("Required"),
  comment: Yup.string(),
});

const BookingForm = () => (
  <div className="w-full border border-theme-gray-light rounded-[10px] px-14 py-11">
    <span className="text-xl font-semibold mb-2">Book your campervan now</span>
    <p className="text-theme-gray mb-6">
      Stay connected! We are always ready to help you.
    </p>
    <Formik
      initialValues={{ name: "", email: "", date: null, comment: "" }}
      validationSchema={BookingSchema}
      onSubmit={(values, { resetForm }) => {
        toast("Your order has been sent.", {
          type: "success",
          duration: 1000,
        });
        resetForm();
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="flex flex-col space-y-[14px]">
          <div className="">
            <Field
              name="name"
              as={Input}
              type="text"
              placeholder="Name*"
              className={errors.name && touched.name ? "border-red-500" : ""}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name}</span>
            )}
          </div>
          <div className="">
            <Field
              name="email"
              as={Input}
              type="email"
              placeholder="Email*"
              className={errors.email && touched.email ? "border-red-500" : ""}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full p-[18px] rounded-[10px] h-auto text-left font-normal justify-start border-theme-inputs bg-theme-inputs text-sm",
                    !values.date && "text-muted-foreground",
                    errors.date && touched.date ? "border-red-500" : "",
                  )}
                >
                  {values.date ? (
                    format(values.date, "PPP")
                  ) : (
                    <span>Pick a date*</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={values.date}
                  onSelect={(date) => setFieldValue("date", date)}
                  disabled={(date) =>
                    date < new Date(new Date().getTime() - 86400000)
                  }
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            {errors.date && touched.date && (
              <span className="text-red-500 text-sm mt-1">{errors.date}</span>
            )}
          </div>
          <div className="">
            <Field name="comment" as={Textarea} placeholder="Comment" />
            {errors.comment && touched.comment && (
              <span className="text-red-500 text-sm mt-1">
                {errors.comment}
              </span>
            )}
          </div>
          <Button className="mx-auto mt-6" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default BookingForm;
